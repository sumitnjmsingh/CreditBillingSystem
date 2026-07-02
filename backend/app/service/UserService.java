package service;

import com.fasterxml.jackson.databind.JsonNode;
import models.CreditCard;
import models.User;
import repositories.UserRepository;

import javax.inject.Inject;

import org.mindrot.jbcrypt.BCrypt;

import java.util.List;

public class UserService {

    private final UserRepository userRepository;

    @Inject
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void signUp(User user) {

        String hashedPassword = BCrypt.hashpw(user.getUserPassword(), BCrypt.gensalt(12));
        user.setUserPassword(hashedPassword);
        userRepository.saveUser(user);
    }

    public User findByEmail(String userEmail) {
        return userRepository.findByEmail(userEmail);
    }

    public List<CreditCard> findById(Long userId) {
        return userRepository.findById(userId);
    }

    public User findByResetToken(String token) {
        return userRepository.findByResetToken(token);
    }

    public User findUserById(Long userId) {
        return userRepository.findUserById(userId);
    }

    public User updateProfile(Long userId, JsonNode json) {

        User user = userRepository.findUserById(userId);

        if (user == null) {
            return null;
        }

        user.setUserName(json.get("userName").asText());
        user.setPhoneNumber(json.get("phoneNumber").asText());
        user.setAddress(json.get("address").asText());
        user.setOccupation(json.get("occupation").asText());
        user.setAnnualSalary(json.get("annualSalary").asDouble());

        user.update();

        return user;

    }
}
