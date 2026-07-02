package service;

import models.BillingStatement;
import models.CreditCard;
import models.Payment;
import repositories.BillingRepository;

import javax.inject.Inject;
import java.time.LocalDate;
import java.util.UUID;

public class PaymentService {
    BillingRepository billingRepository;

    @Inject
    public PaymentService(BillingRepository billingRepository) {
        this.billingRepository = billingRepository;
    }

    public Payment payBill(Long cardId, Double amount, Payment payment) {

        CreditCard card = CreditCard.find.byId(cardId);

        if (card == null) {

            throw new RuntimeException("Card not found");

        }

        BillingStatement previous = billingRepository.getPreviousStatement(card.getCardId());

        if (previous != null) {
            LocalDate today = LocalDate.now();
            LocalDate dueDate = previous.getDueDate();

            if (today.isAfter(dueDate)) {
                Double totalAmountToPaid = previous.getOutstandingBalance() + previous.getOutstandingBalance() * 0.03 + 500 + (500 + previous.getOutstandingBalance()) * 0.18;
                if (amount > totalAmountToPaid) return null;
                else if (amount.equals(totalAmountToPaid)) {
                    previous.setPaid(true);
                    previous.setOutstandingBalance(0D);
                    previous.update();
                } else {
                    previous.setOutstandingBalance(totalAmountToPaid - amount);
                    previous.update();
                }
            } else {
                Double totalAmountToPaid = previous.getOutstandingBalance();
                if (amount > totalAmountToPaid) return null;
                else if (amount.equals(totalAmountToPaid)) {
                    previous.setOutstandingBalance(0D);
                    previous.setPaid(true);
                    previous.update();
                } else {
                    previous.setOutstandingBalance(totalAmountToPaid - amount);
                    previous.update();
                }
            }

//            if(amount > (previous.getOutstandingBalance() + previous.getLateFee())) return null;
//            previous.setPayment(amount);
//            previous.update();
        }

        payment.setCard(card);

        payment.setPaymentDate(LocalDate.now());
        String referenceNumber = UUID.randomUUID().toString();

        payment.setReferenceNumber(referenceNumber);
        payment.setPaymentMode("Online");

        payment.setPaymentStatus("SUCCESS");

        payment.save();

        double newUsedLimit = card.getUsedLimit() - amount;

        if (newUsedLimit < 0) {

            newUsedLimit = 0;

        }

        card.setUsedLimit(newUsedLimit);

        card.setAvailableLimit(card.getCreditLimit() - newUsedLimit);

        card.update();

        return payment;
    }
}
