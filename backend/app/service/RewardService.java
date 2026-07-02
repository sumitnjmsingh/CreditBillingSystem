package service;

import models.CreditCard;
import models.RewardTransaction;
import models.Transaction;

public class RewardService {

    public void processReward(Transaction transaction) {

        CreditCard card = transaction.getCard();

        double amount = transaction.getAmount();

        int rewardPoints = (int) (amount / 100);

        double cashback = amount * 0.01;

        card.setRewardPoints(card.getRewardPoints() + rewardPoints);

        card.setCashbackEarned(card.getCashbackEarned() + cashback);

        card.update();

        RewardTransaction reward = new RewardTransaction();

        reward.setCard(card);

        reward.setTransaction(transaction);

        reward.setPointsEarned(rewardPoints);

        reward.setPointsRedeemed(0);

        reward.setBalanceAfterTransaction(card.getRewardPoints());

        reward.setRewardType("EARNED");

        reward.setRemarks("Reward earned on transaction of ₹" + amount);

        reward.save();

    }

    public void redeemReward(Long cardId, int points) {

        CreditCard card = CreditCard.find.byId(cardId);

        if (points > card.getRewardPoints()) {

            throw new RuntimeException("Insufficient Reward Points");

        }

        double cashback = points * 0.25;

        card.setRewardPoints(card.getRewardPoints() - points);

        card.setCashbackEarned(card.getCashbackEarned() + cashback);

        card.update();

    }
}
