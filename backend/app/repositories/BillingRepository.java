package repositories;

import models.BillingStatement;
import models.CreditCard;
import models.Transaction;
import play.Logger;

import java.time.LocalDate;
import java.util.List;

public class BillingRepository {

    public CreditCard getCardsForBilling(Integer billingDay, Long cardId) {

        return CreditCard.find.where().eq("billingDate", billingDay).eq("active", true).eq("cardId", cardId).findUnique();
    }

    public BillingStatement getPreviousStatement(Long cardId) {

        return BillingStatement.find.where().eq("card.cardId", cardId).orderBy("createdAt desc").setMaxRows(1).findUnique();
    }

    public List<Transaction> getCurrentCycleTransactions(Long cardId, LocalDate from, LocalDate to) {

        return Transaction.find.where().eq("card.cardId", cardId).between("transactionDate", from, to).eq("billed", false).findList();
    }
}
