package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import dto.CreditCardResponse;
import dto.TransactionResponse;
import models.CreditCard;
import models.Transaction;
import play.Logger;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;
import service.CardService;
import service.EmailService;
import service.UserService;
import actions.Authenticated;

import javax.inject.Inject;
import java.io.File;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public class CardController extends Controller {

    private final CardService cardService;
    private final UserService userService;
    private final EmailService emailService;

    @Inject
    public CardController(CardService cardService, UserService userService, EmailService emailService) {
        this.userService = userService;
        this.cardService = cardService;
        this.emailService = emailService;
    }

    @Authenticated
    public Result addCard() {
        JsonNode json = request().body().asJson();

        CreditCard creditCard = Json.fromJson(json, CreditCard.class);

        Long userId = (Long) Http.Context.current().args.get("userId");

        if (userId == null) {
            return badRequest("Unauthorize User");
        }

        try {
            cardService.addCard(creditCard, userId);
            return ok("Card Added");
        } catch (Exception e) {
            Logger.error("Error :", e);
            return internalServerError("Something went wrong in card addition");
        }
    }

    @Authenticated
    public Result completePayment() {
        ObjectNode response = Json.newObject();

        JsonNode json = request().body().asJson();

        if (json == null) {
            return errorResult(BAD_REQUEST, "Request body must be in JSON format.");
        }
        Double amount = json.get("amount").asDouble();

        if (amount < 0) {
            return errorResult(BAD_REQUEST, "Amount cannot be negative.");
        }

        String cardNumber = json.get("cardNumber").asText();

        CreditCard card = CreditCard.find.where().eq("cardNumber", cardNumber).findUnique();

        if (card == null) {
            return errorResult(NOT_FOUND, "Credit card not found.");
        }

        if (!card.isActive()) {
            return errorResult(BAD_REQUEST, "This credit card is inactive.");
        }

        if (card.isBlocked()) {
            return errorResult(BAD_REQUEST, "This credit card is currently blocked.");
        }

        if (!"ACTIVE".equalsIgnoreCase(card.getStatus())) {

            return errorResult(BAD_REQUEST, "Transactions are not allowed for card status: " + card.getStatus());
        }

        if (!card.getEncryptedCvv().equals(json.get("cvv").asText())) {
            return errorResult(BAD_REQUEST, "Incorrect CVV.");
        }

        if (amount > card.getAvailableLimit()) {
            return errorResult(BAD_REQUEST, "Insufficient available credit limit.");
        }

        Transaction transaction = new Transaction();

        transaction.setMerchantName(json.get("merchantName").asText());

        transaction.setMerchantCategory(json.get("merchantCategory").asText());

        transaction.setMerchantLocation(json.get("merchantLocation").asText());

        transaction.setAmount(amount);

        transaction.setCurrency(json.get("currency").asText());

        transaction.setPaymentMode(json.get("paymentMode").asText());

        transaction.setStatus(json.get("status").asText());

        transaction.setTransactionDate(LocalDate.now());

        transaction.setTransactionTime(LocalTime.now());
        String referenceNumber = UUID.randomUUID().toString();

        transaction.setReferenceNumber(referenceNumber);

        if (json.has("remarks") && !json.get("remarks").isNull()) {
            transaction.setRemarks(json.get("remarks").asText());
        }

        transaction.setCard(card);

        cardService.addTransaction(transaction);

        try {

            emailService.sendTransactionSuccessEmail(

                    card.getUser().getUserEmail(),

                    card.getCardHolderName(),

                    transaction.getMerchantName(),

                    transaction.getAmount(),

                    transaction.getCurrency(),

                    transaction.getReferenceNumber(),

                    card.getAvailableLimit()

            );

        } catch (Exception e) {

            e.printStackTrace();

        }

        response.put("message", "Transaction created successfully.");
        response.put("transactionId", transaction.getTransactionId());
        response.put("cardId", card.getCardId());
        response.put("remainingLimit", card.getAvailableLimit());

        return created(response);
    }

    @Authenticated
    public Result showAllCards() {
        Long userId = (Long) Http.Context.current().args.get("userId");

        try {
            List<CreditCard> cards = userService.findById(userId);

            List<CreditCardResponse> response = cards.stream().map(CreditCardResponse::new).collect(Collectors.toList());

            return ok(Json.toJson(response));
        } catch (Exception e) {
            Logger.error("Error fetching Cards", e);
            return internalServerError("Error fetching Cards");
        }
    }

    public Result deleteCard(Long cardId) {
        cardService.deleteCard(cardId);

        return ok("Card Deleted");
    }

    @Authenticated
    public Result getAllTransaction(Long id) {

        try {
            Long userId = (Long) Http.Context.current().args.get("userId");

            Long userCtoCard = CreditCard.find.byId(id).getUser().getUserId();

            if (!userId.equals(userCtoCard)) {
                return badRequest("Enter cardId corresponding to your Card");
            }

            List<Transaction> transactions = new ArrayList<>();
            transactions = cardService.getAllTransaction(id);

            List<TransactionResponse> response = transactions.stream().map(TransactionResponse::new).collect(Collectors.toList());

            return ok(Json.toJson(response));
        } catch (Exception e) {
            Logger.error("Error: ", e);
            return internalServerError("Something went wrong");
        }
    }

    public Result getTotalTransactionAmount(Long cardId) {
        List<Transaction> transactions = new ArrayList<>();
        transactions = cardService.getAllTransaction(cardId);

        Double totalTransactionAmount = 0.0d;
        for (Transaction transaction : transactions) {
            totalTransactionAmount += transaction.getAmount();
        }

        return ok("Total Transaction Amount : " + totalTransactionAmount);
    }

    public Result blockCard(Long cardId) {
        CreditCard card = cardService.findCardById(cardId);

        if (card == null) {
            return badRequest("Unable to get card");
        }

        try {
            cardService.blockCard(cardId, card);
            return ok("Card Blocked");
        } catch (Exception e) {
            Logger.error("Unable to block card", e);
            return internalServerError("Something went wrong while blocking the card");
        }
    }

    public Result unBlockCard(Long cardId) {
        CreditCard card = cardService.findCardById(cardId);

        if (card == null) {
            return badRequest("Unable to get card");
        }

        try {
            cardService.unBlockCard(cardId, card);
            return ok("Card unBlocked");
        } catch (Exception e) {
            Logger.error("Unable to unBlock card", e);
            return internalServerError("Something went wrong while unBlocking the card");
        }
    }

    @Authenticated
    public Result getAvailableLimit(Long cardId) {

        try {
            Long userId = (Long) Http.Context.current().args.get("userId");

            Long userCtoCard = CreditCard.find.byId(cardId).getUser().getUserId();

            if (!userId.equals(userCtoCard)) {
                return badRequest("Enter cardId corresponding to your Card");
            }
            return ok(cardService.getAvailableLimit(cardId));
        } catch (Exception e) {
            Logger.error("Error: ", e);
            return internalServerError("Something went wrong");
        }
    }

    @Authenticated
    public Result searchTransactions() {
        String search = request().getQueryString("search");
        String category = request().getQueryString("category");
        String status = request().getQueryString("status");
        String sortBy = request().getQueryString("sortBy");
        String order = request().getQueryString("order");
        List<Transaction> transactions = cardService.searchTransactions(search, category, status, sortBy, order);

        return ok("All Transaction available");
    }

    @Authenticated
    public Result downloadCSV() {

        Long userId = (Long) Http.Context.current().args.get("userId");

        try {
            File csvFile = cardService.downloadCSV(userId);

            return ok(csvFile).as("text/csv").withHeader("Content-Disposition", "attachment; filename=transactions.csv");
        } catch (Exception e) {
            Logger.error("Error :", e);
            return internalServerError("Something went wrong");
        }
    }

    @Authenticated
    public Result downloadPDF() {

        Long userId = (Long) Http.Context.current().args.get("userId");

        try {
            File pdf = cardService.downloadPDF(userId);

            return ok(pdf).as("application/pdf").withHeader("Content-Disposition", "attachment; filename=transactions.pdf");
        } catch (Exception e) {
            Logger.error("Error :", e);
            return internalServerError("Something went wrong");
        }

    }

    private Result errorResult(int status, String message) {
        ObjectNode json = Json.newObject();
        json.put("success", false);
        json.put("message", message);

        return status(status, json);
    }

}
