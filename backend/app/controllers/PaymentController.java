package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import models.BillingStatement;
import models.CreditCard;
import models.Payment;
import play.mvc.Result;
import play.libs.Json;
import play.mvc.Controller;
import service.PaymentService;

import javax.inject.Inject;
import java.util.List;

public class PaymentController extends Controller {

    private final PaymentService paymentService;

    @Inject
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    public Result payBill(String cardNumber) {

        JsonNode json = request().body().asJson();

        Double amount = json.get("amount").asDouble();

        if(amount < 0){
            return errorResult(BAD_REQUEST, "Amount cannot be negative.");
        }

        Payment payment = Json.fromJson(json, Payment.class);

        CreditCard card = CreditCard.find.where().eq("cardNumber", cardNumber).findUnique();

        if(card.isBlocked()){
            return errorResult(BAD_REQUEST,"Card id blocked");
        }

        List<BillingStatement> BillingStatements = BillingStatement.find.where().eq("card.cardId", card.getCardId()).findList();
        if (BillingStatements.isEmpty()) {
            return errorResult(BAD_REQUEST, "No billing statements available for this card");
        }

        Payment payment_info = paymentService.payBill(card.getCardId(), amount, payment);
        if (payment_info == null) {
            return errorResult(BAD_REQUEST, "Amount exceeds Outstanding Balance");
        }

        return ok("Payment Created");

    }

    private Result errorResult(int status, String message) {
        ObjectNode json = Json.newObject();
        json.put("success", false);
        json.put("message", message);

        return status(status, json);
    }
}
