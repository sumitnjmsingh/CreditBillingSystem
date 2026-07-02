package repositories;

import models.Payment;

import java.util.List;

public class PaymentRepository {

    public void save(Payment payment) {
        payment.save();
    }

    public List<Payment> getPayments(Long cardId) {

        return Payment.find.where().eq("card.cardId", cardId).orderBy("paymentDate desc").findList();

    }

}