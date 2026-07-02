package service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import models.ApplicationLog;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;

import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;

public class AIService {

    private static final Config config = ConfigFactory.load();

    private static final String API_KEY = config.getString("API_KEY");

    private static final String API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + API_KEY;

    public String analyzeLogs() {

        List<ApplicationLog> logs = ApplicationLog.find.orderBy("createdAt desc").setMaxRows(20).findList();

        StringBuilder prompt = new StringBuilder();

        prompt.append("You are an experienced Java Backend Engineer.\n");
        prompt.append("Analyze the following application logs.\n");
        prompt.append("Find the root cause.\n");
        prompt.append("Suggest the exact steps to fix the issue.\n");
        prompt.append("Mention the severity.\n");
        prompt.append("If code changes are needed, suggest them.\n\n");

        for (ApplicationLog log : logs) {

            prompt.append("LEVEL : ").append(log.getLevel()).append("\n");

            prompt.append("MODULE : ").append(log.getModule()).append("\n");

            prompt.append("MESSAGE : ").append(log.getMessage()).append("\n");

            prompt.append("STACKTRACE : ").append(log.getStackTrace()).append("\n\n");
        }

        return askGemini(prompt.toString());

    }

    public String askGemini(String prompt) {

        try {

            URL url = new URL(API_URL);

            HttpURLConnection connection = (HttpURLConnection) url.openConnection();

            connection.setRequestMethod("POST");

            connection.setRequestProperty("Content-Type", "application/json");

            connection.setDoOutput(true);

            String jsonBody = "{" + "\"contents\":[" + "{" + "\"parts\":[" + "{" + "\"text\":\"" + escapeJson(prompt) + "\"" + "}" + "]" + "}" + "]" + "}";

            OutputStream os = connection.getOutputStream();

            os.write(jsonBody.getBytes("UTF-8"));

            os.flush();

            os.close();

            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));

            String line;

            StringBuilder response = new StringBuilder();

            while ((line = reader.readLine()) != null) {

                response.append(line);

            }

            reader.close();

            return extractText(response.toString());

        } catch (Exception e) {

            e.printStackTrace();

            return "Unable to connect to Gemini : " + e.getMessage();

        }

    }

    private String extractText(String json) throws Exception {

        ObjectMapper mapper = new ObjectMapper();

        JsonNode root = mapper.readTree(json);

        return root.get("candidates").get(0).get("content").get("parts").get(0).get("text").asText();

    }

    private String escapeJson(String text) {

        return text.replace("\\", "\\\\").replace("\"", "\\\"").replace("\n", "\\n").replace("\r", "");

    }

}