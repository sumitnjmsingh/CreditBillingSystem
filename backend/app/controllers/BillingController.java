package controllers;

import actions.Authenticated;
import com.fasterxml.jackson.databind.node.ObjectNode;
import models.BillingStatement;
import models.CreditCard;
import play.Logger;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;
import service.BillingService;

import javax.inject.Inject;

public class BillingController extends Controller {

    private final BillingService billingService;

    @Inject
    public BillingController(BillingService billingService) {

        this.billingService = billingService;
    }

    @Authenticated
    public Result generateMonthlyStatements(Long cardId) {

        try {
            Long userId = (Long) Http.Context.current().args.get("userId");

            Long userCtoCard = CreditCard.find.byId(cardId).getUser().getUserId();

            if (!userId.equals(userCtoCard)) {
                return badRequest("Enter cardId corresponding to your Card");
            }

            BillingStatement billingStatements = billingService.generateMonthlyStatements(cardId);

            ObjectNode json = Json.newObject();
            json.put("previousBalance", billingStatements.getPreviousBalance());
            json.put("currentBalance", billingStatements.getCurrentBalance());
            json.put("outstandingBalance", billingStatements.getOutstandingBalance());
            json.put("minimumDue", billingStatements.getMinimumDue());
            json.put("interest", billingStatements.getInterest());
            json.put("lateFee", billingStatements.getLateFee());
            json.put("gst", billingStatements.getGst());
            json.put("availableCredit", billingStatements.getAvailableCredit());
            json.put("billingDate", Json.toJson(billingStatements.getBillingDate()));
            json.put("dueDate", Json.toJson(billingStatements.getDueDate()));

            return ok(json);
        } catch (Exception e) {
            Logger.error("Error: ", e);
            return internalServerError("Something went wrong");
        }
    }
}
