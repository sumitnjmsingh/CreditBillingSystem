package repositories;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import models.CreditCard;
import models.Transaction;
import models.User;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import play.libs.Json;
import service.RewardService;
import utils.CardUtil;

import javax.inject.Singleton;
import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;
import java.util.Random;

@Singleton
public class CardRepository {
    public List<Transaction> getAllTransaction(Long id) {
        return Transaction.find.where().eq("card.cardId", id).findList();
    }

    public void addCard(CreditCard creditCard, Long userId) {
        User user = User.find.byId(userId);
        creditCard.setCardNumber(CardUtil.generateCardNumber());
        creditCard.setAvailableLimit(creditCard.getCreditLimit());
        creditCard.setBillingDate(24);
        creditCard.setPaymentDueDate(9);
        creditCard.setJoiningDate(LocalDate.now());
        creditCard.setExpiryDate(LocalDate.now().plusYears(4));
        Random random = new Random();
        String cvv = String.format("%03d", random.nextInt(1000));
        creditCard.setEncryptedCvv(cvv);
        creditCard.setUser(user);

        creditCard.save();
    }

    public void addTransaction(Transaction transaction) {
        transaction.setTransactionDate(LocalDate.now());
        transaction.save();
        RewardService rewardService = new RewardService();
        rewardService.processReward(transaction);
    }

    public CreditCard findCardById(Long cardId) {
        return CreditCard.find.where().eq("cardId", cardId).findUnique();
    }

    public void deleteCard(Long cardId) {
        CreditCard card = CreditCard.find.byId(cardId);
        if (card != null) {
            card.delete();
        }
    }

    public void blockCard(Long cardId, CreditCard card) {
        card.setBlocked(true);
        card.save();
    }

    public void unBlockCard(Long cardId, CreditCard card) {
        card.setBlocked(false);
        card.save();
    }

    public ObjectNode getAvailableLimit(Long cardId) {
        CreditCard card = CreditCard.find.byId(cardId);
        ObjectNode json = Json.newObject();
        json.put("creditLimit", card.getCreditLimit());
        json.put("usedLimit", card.getUsedLimit());
        json.put("availableLimit", card.getAvailableLimit());

        return json;
    }
}
