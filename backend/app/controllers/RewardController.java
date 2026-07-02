package controllers;

import actions.Authenticated;
import com.fasterxml.jackson.databind.node.ObjectNode;
import models.CreditCard;
import models.RewardTransaction;
import play.Logger;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;

import java.util.List;

public class RewardController extends Controller {
    @Authenticated
    public Result rewardBalance(Long cardId) {

        try {
            Long userId = (Long) Http.Context.current().args.get("userId");

            ObjectNode json = Json.newObject();

            CreditCard card = CreditCard.find.byId(cardId);

            Long userCtoCard = card.getUser().getUserId();

            if (!userId.equals(userCtoCard)) {
                return badRequest("Enter cardId corresponding to your Card");
            }

            List<RewardTransaction> rewardTransaction = RewardTransaction.find.where().eq("card.cardId", cardId).findList();

            Integer rewardPoints = 0;
            for (RewardTransaction tnx : rewardTransaction) {
                rewardPoints += tnx.getPointsEarned();
            }

            json.put("rewardPoints", rewardPoints);

            json.put("rewardValue", rewardPoints / 4);
            json.put("lastUpdated", card.getUpdatedAt().toString());

            return ok(json);
        } catch (Exception e) {
            Logger.error("Error:", e);
            return internalServerError("Something went wrong");
        }

    }
}
