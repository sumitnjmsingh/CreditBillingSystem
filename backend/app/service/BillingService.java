package service;

import models.BillingStatement;
import models.CreditCard;
import models.Transaction;
import repositories.BillingRepository;

import javax.inject.Inject;
import java.time.LocalDate;
import java.util.List;

public class BillingService {

    BillingRepository billingRepository;

    @Inject
    public BillingService(BillingRepository billingRepository) {
        this.billingRepository = billingRepository;
    }

    public BillingStatement generateMonthlyStatements(Long cardId) {
        int today = LocalDate.now().getDayOfMonth();

        CreditCard card = billingRepository.getCardsForBilling(today, cardId);

        BillingStatement billingStatement = BillingStatement.find.where().eq("card.cardId", cardId).orderBy("createdAt desc").setMaxRows(1).findUnique();

        if (card == null && billingStatement != null) {
            return billingStatement;
        }

        return generateStatement(card);
    }

    private BillingStatement generateStatement(CreditCard card) {

        BillingStatement previous = billingRepository.getPreviousStatement(card.getCardId());

        LocalDate today = LocalDate.now();

        if (previous != null && previous.getBillingDate().equals(today)) {
            return previous;
        } else {
            LocalDate from = today.minusMonths(1);

            List<Transaction> transactions = billingRepository.getCurrentCycleTransactions(card.getCardId(), from, today);

            double currentBalance = transactions.stream().mapToDouble(Transaction::getAmount).sum();

            double previousBalance = previous == null ? 0 : previous.getOutstandingBalance();

            double payment = previous == null ? 0 : previous.getPayment();

            double outstanding = previousBalance + currentBalance - payment;

            double interest = 0;

            if (previous != null && !previous.getPaid()) {

                interest = outstanding * 0.03;

            }

            double lateFee = 0;

            if (previous != null && !previous.getPaid() && LocalDate.now().isAfter(previous.getDueDate())) {

                lateFee = 500;

            }

            double gst = (interest + lateFee) * 0.18;

            double minimumDue = outstanding * 0.05;

            double availableCredit = card.getCreditLimit() - outstanding;

            outstanding += gst + interest + lateFee;
            minimumDue = outstanding * 0.05;

            BillingStatement statement = new BillingStatement();

            statement.setCard(card);

            statement.setPreviousBalance(previousBalance);

            statement.setCurrentBalance(currentBalance);

            statement.setOutstandingBalance(outstanding);

            statement.setMinimumDue(minimumDue);

            statement.setInterest(interest);

            statement.setLateFee(lateFee);

            statement.setGst(gst);

            statement.setAvailableCredit(availableCredit);

            statement.setBillingDate(today);

            statement.setDueDate(today.plusDays(card.getPaymentDueDate()));

            statement.setPayment(0.0);

            statement.setPaid(false);

            statement.save();

            card.setAvailableLimit(availableCredit);

            card.setUsedLimit(outstanding);

            card.update();

            for (Transaction transaction : transactions) {

                transaction.setBilled(true);

                transaction.update();

            }

            return statement;
        }
    }
}
