package controllers;

import actions.Authenticated;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import models.CreditCard;
import org.mindrot.jbcrypt.BCrypt;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;
import service.EmailService;
import service.UserService;
import models.User;
import utils.JwtUtil;

import javax.inject.Inject;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import play.Logger;
import utils.RateLimiter;

public class UserController extends Controller {
    private final UserService userService;
    private final EmailService emailService;

    @Inject
    public UserController(UserService userService, EmailService emailService) {
        this.userService = userService;
        this.emailService = emailService;
    }

    public Result signUp() {
        try {
            JsonNode json = request().body().asJson();
            User user = Json.fromJson(json, User.class);

            userService.signUp(user);
            emailService.sendWelcomeMessage(user.getUserEmail());

            return ok("SignUp Successful");
        } catch (Exception e) {
            Logger.error("SignUp Failed", e);

            return internalServerError("Something went wrong");
        }
    }

    public Result signIn() {
        try {
            JsonNode json = request().body().asJson();

            String userEmail = json.get("userEmail").asText();
            String userPassword = json.get("userPassword").asText();

            String ip = request().remoteAddress();

            boolean emailAllowed = RateLimiter.allowRequest("EMAIL_" + userEmail, 2, 15 * 60 * 1000);

            boolean ipAllowed = RateLimiter.allowRequest("IP_" + ip, 2, 15 * 60 * 1000);

            if (!emailAllowed || !ipAllowed) {

                ObjectNode response = Json.newObject();

                response.put("message", "Too many requests. Please try again after 15 minutes.");

                return status(429, response);
            }

            User user = userService.findByEmail(userEmail);

            if (user == null) {
                return unauthorized("Invalid Email");
            }

            boolean isPasswordMatch = BCrypt.checkpw(userPassword, user.getUserPassword());
            if (!isPasswordMatch) {
                return unauthorized("Invalid Password");
            }
            String token = JwtUtil.generateToken(user.getUserId(), user.getUserEmail());

            List<Long> cardIds = (CreditCard.find.where().eq("user.userId", user.getUserId()).findList()).stream().map(CreditCard::getCardId).collect(Collectors.toList());

            ObjectNode response = Json.newObject();

            response.put("message", "Login Successful");
            response.put("token", token);
            response.set("user", Json.toJson(user));
            response.set("cardIds", Json.toJson(cardIds));
            return ok(response);
        } catch (Exception e) {
            Logger.error("Login Failed", e);
            return internalServerError("Something went wrong.");
        }
    }

    public Result forgotPassword() {

        ObjectNode response = Json.newObject();
        JsonNode json = request().body().asJson();
        String userEmail = json.get("userEmail").asText();

        String ip = request().remoteAddress();

        boolean emailAllowed = RateLimiter.allowRequest("EMAIL_" + userEmail, 2, 15 * 60 * 1000);

        boolean ipAllowed = RateLimiter.allowRequest("IP_" + ip, 2, 15 * 60 * 1000);

        if (!emailAllowed || !ipAllowed) {
            response.put("message", "Too many requests. Please try again after 15 minutes.");

            return status(429, response);
        }

        User user = userService.findByEmail(userEmail);

        if (user == null) {
            return ok("User Not Found");
        }
        String token = UUID.randomUUID().toString();
        user.setResetToken(token);
        user.setResetTokenExpiry(LocalDateTime.now().plusMinutes(15));

        user.update();

        String resetLink = "http://localhost:5173/reset-password?token=" + token;

        try {

            emailService.sendResetEmail(user.getUserEmail(), resetLink);

        } catch (Exception e) {

            e.printStackTrace();

            return internalServerError("Unable to send email.");
        }

        return ok("Password reset link sent.");
    }

    public Result resetPassword() {
        JsonNode json = request().body().asJson();

        String newPassword = json.get("newPassword").asText();
        String token = json.get("token").asText();

        if (token == null) {
            return badRequest("Unauthorize Request");
        }

        User user = userService.findByResetToken(token);

        if (user == null) {
            return badRequest("Invalid token");
        }

        if (user.getResetTokenExpiry().isBefore(LocalDateTime.now())) {
            return badRequest("Token expired");
        }

        String newHashedPassword = BCrypt.hashpw(newPassword, BCrypt.gensalt(7));
        user.setUserPassword(newHashedPassword);

        user.setResetToken(null);
        user.setResetTokenExpiry(null);

        user.update();

        return ok("Password updated");
    }

    @Authenticated
    public Result changePassword() {
        JsonNode json = request().body().asJson();
        String oldPassword = json.get("oldPassword").asText();
        String newPassword = json.get("newPassword").asText();

        Long userId = (Long) Http.Context.current().args.get("userId");
        User user = userService.findUserById(userId);

        if (user == null) {
            return badRequest("Unauthorize Request");
        }

        if (!BCrypt.checkpw(oldPassword, user.getUserPassword())) {
            return badRequest("Unauthorized User");
        }
        user.setUserPassword(BCrypt.hashpw(newPassword, BCrypt.gensalt()));
        user.update();

        return ok("Password Updated");
    }

    @Authenticated
    public Result updateProfile() {

        JsonNode json = request().body().asJson();

        Long userId = (Long) Http.Context.current().args.get("userId");

        User user = userService.updateProfile(userId, json);

        if (user == null) {
            return notFound("User not found");
        }

        ObjectNode response = Json.newObject();
        response.put("message", "Profile Updated Successfully");
        response.set("user", Json.toJson(user));

        return ok(response);

    }
}