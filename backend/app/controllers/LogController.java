package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import models.ApplicationLog;
import play.Logger;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import service.AIService;

import javax.inject.Inject;

public class LogController extends Controller {

    private final AIService aiService;

    @Inject
    public LogController(AIService aiService) {
        this.aiService = aiService;
    }

    public Result analyzeLogs() {

        try {
            String answer = aiService.analyzeLogs();

            ObjectNode json = Json.newObject();

            json.put("analysis", answer);

            return ok(json);
        } catch (Exception e) {
            Logger.error("Error :", e);
            return internalServerError("Something went wrong fetching Logs");
        }
    }

    public Result addLogs() {
        JsonNode json = request().body().asJson();

        try {
            ApplicationLog applicationLog = Json.fromJson(json, ApplicationLog.class);
            applicationLog.save();

            return ok("Logs Saved");
        } catch (Exception e) {
            Logger.error("Error", e);
            return internalServerError("Error saving in DB");
        }
    }
}
