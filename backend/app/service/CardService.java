package service;

import com.avaje.ebean.Expr;
import com.avaje.ebean.ExpressionList;
import com.fasterxml.jackson.databind.node.ObjectNode;
import models.CreditCard;
import models.Transaction;
import models.User;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import repositories.CardRepository;
import repositories.UserRepository;

import javax.inject.Inject;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class CardService {

    private CardRepository card_repo;
    private UserRepository user_repo;

    @Inject
    public CardService(CardRepository card_repo, UserRepository user_repo) {
        this.user_repo = user_repo;
        this.card_repo = card_repo;
    }

    public List<Transaction> getAllTransaction(Long id) {
        return card_repo.getAllTransaction(id);
    }

    public void addCard(CreditCard creditCard, Long userId) {
        card_repo.addCard(creditCard, userId);
    }

    public void addTransaction(Transaction transaction) {

        CreditCard card = transaction.getCard();

        double amount = transaction.getAmount();

        card.setAvailableLimit(card.getAvailableLimit() - amount);

        card.setUsedLimit(card.getUsedLimit() + amount);

        transaction.save();
        transaction.setStatus("SUCCESS");
        transaction.update();

        card.update();

        RewardService rewardService = new RewardService();

        rewardService.processReward(transaction);

    }

    public CreditCard findCardById(Long cardId) {
        return card_repo.findCardById(cardId);
    }

    public void deleteCard(Long cardId) {
        card_repo.deleteCard(cardId);
    }

    public void blockCard(Long cardId, CreditCard card) {
        card_repo.blockCard(cardId, card);
    }

    public void unBlockCard(Long cardId, CreditCard card) {
        card_repo.unBlockCard(cardId, card);
    }

    public ObjectNode getAvailableLimit(Long cardId) {
        return card_repo.getAvailableLimit(cardId);
    }

    public List<Transaction> searchTransactions(String search, String category, String status, String sortBy, String order) {

        ExpressionList<Transaction> query = Transaction.find.where();

        if (search != null && !search.trim().isEmpty()) {

            query.or(Expr.ilike("merchantName", "%" + search + "%"), Expr.ilike("merchantCategory", "%" + search + "%"));
        }

        if (category != null && !category.trim().isEmpty()) {
            query.eq("merchantCategory", category);
        }

        if (status != null && !status.trim().isEmpty()) {
            query.eq("status", status);
        }

        if (sortBy == null || sortBy.trim().isEmpty()) {
            sortBy = "transactionDate";
        }

        if (order == null || order.trim().isEmpty()) {
            order = "desc";
        }

        query.orderBy(sortBy + " " + order);

        return query.findList();
    }

    public File downloadCSV(Long userId) {

        List<CreditCard> cards = user_repo.findById(userId);

        File csv = new File("transactions.csv");

        try (FileWriter writer = new FileWriter(csv)) {

            writer.append("Transaction ID,Merchant,Category,Amount,Currency,Date,Time,Payment Mode,Status,Reference Number\n");

            for (CreditCard card : cards) {

                for (Transaction transaction : card.getTransactions()) {

                    writer.append(transaction.getTransactionId() + ",");

                    writer.append(transaction.getMerchantName() + ",");

                    writer.append(transaction.getMerchantCategory() + ",");

                    writer.append(transaction.getAmount() + ",");

                    writer.append(transaction.getCurrency() + ",");

                    writer.append(transaction.getTransactionDate() + ",");

                    writer.append(transaction.getTransactionTime() + ",");

                    writer.append(transaction.getPaymentMode() + ",");

                    writer.append(transaction.getStatus() + ",");

                    writer.append(transaction.getReferenceNumber() + "\n");

                }

            }

        } catch (IOException e) {

            throw new RuntimeException(e);

        }

        return csv;

    }

    public File downloadPDF(Long userId) {
        List<Transaction> transactions = new ArrayList<>();
        List<CreditCard> cards = user_repo.findById(userId);
        for (CreditCard card : cards) {
            List<Transaction> transactions_ = getAllTransaction(card.getCardId());
            for (Transaction tnx : transactions_) {
                transactions.add(tnx);
            }
        }

        File pdf = new File("transactions.pdf");

        try (PDDocument document = new PDDocument()) {

            PDPage page = new PDPage();

            document.addPage(page);

            PDPageContentStream content = new PDPageContentStream(document, page);

            content.setFont(PDType1Font.HELVETICA_BOLD, 20);

            content.setFont(PDType1Font.HELVETICA_BOLD, 22);

            content.beginText();
            content.newLineAtOffset(150, 770);
            content.showText("CREDIT CARD STATEMENT");
            content.endText();

            content.moveTo(40, 755);
            content.lineTo(560, 755);
            content.stroke();


            User user = User.find.byId(userId);

            CreditCard card = cards.get(0);

            content.setFont(PDType1Font.HELVETICA, 12);

            int y = 725;

            content.beginText();
            content.newLineAtOffset(50, y);
            content.showText("Customer Name : " + user.getUserName());
            content.endText();

            y -= 20;

            content.beginText();
            content.newLineAtOffset(50, y);

            String cardNumber = card.getCardNumber();

            String masked = "XXXX XXXX XXXX " + cardNumber.substring(cardNumber.length() - 4);

            content.showText("Card Number   : " + masked);
            content.endText();

            y -= 20;

            content.beginText();
            content.newLineAtOffset(50, y);

            content.showText("Statement     : June-2026");

            content.endText();

            y -= 15;

            content.moveTo(40, y);
            content.lineTo(560, y);
            content.stroke();

            y -= 20;

            content.setFont(PDType1Font.HELVETICA_BOLD, 12);

            content.beginText();
            content.newLineAtOffset(50, y);
            content.showText("Merchant");
            content.endText();

            content.beginText();
            content.newLineAtOffset(220, y);
            content.showText("Date");
            content.endText();

            content.beginText();
            content.newLineAtOffset(330, y);
            content.showText("Amount");
            content.endText();

            content.beginText();
            content.newLineAtOffset(450, y);
            content.showText("Status");
            content.endText();

            y -= 10;

            content.moveTo(40, y);
            content.lineTo(560, y);
            content.stroke();

            y -= 20;

            double totalSpent = 0;

            content.setFont(PDType1Font.HELVETICA, 11);

            for (Transaction t : transactions) {

                totalSpent += t.getAmount();

                content.beginText();
                content.newLineAtOffset(50, y);
                content.showText(t.getMerchantName());
                content.endText();

                content.beginText();
                content.newLineAtOffset(220, y);
                content.showText(t.getTransactionDate().toString());
                content.endText();

                content.beginText();
                content.newLineAtOffset(330, y);
                content.showText("INR " + t.getAmount());
                content.endText();

                content.beginText();
                content.newLineAtOffset(450, y);
                content.showText(t.getStatus());
                content.endText();

                y -= 20;
            }


            content.moveTo(40, y);
            content.lineTo(560, y);
            content.stroke();

            y -= 30;

            content.setFont(PDType1Font.HELVETICA_BOLD, 12);

            content.beginText();
            content.newLineAtOffset(50, y);
            content.showText("Total Transactions : " + transactions.size());
            content.endText();

            y -= 20;

            content.beginText();
            content.newLineAtOffset(50, y);
            content.showText("Total Spent : INR " + totalSpent);
            content.endText();

            content.close();

            document.save(pdf);

        } catch (IOException e) {

            throw new RuntimeException(e);

        }

        return pdf;

    }
}
