package repositories;

import models.CreditCard;
import models.User;

import javax.inject.Singleton;
import java.util.List;

@Singleton
public class UserRepository {

    public void saveUser(User user) {
        user.save();
    }

    public User findByEmail(String email) {
        return User.find.where().eq("userEmail", email).findUnique();
    }

    public List<CreditCard> findById(Long id) {
        return CreditCard.find.where().eq("user.userId", id).findList();
    }

    public User findByResetToken(String token) {
        return User.find.where().eq("resetToken", token).findUnique();
    }

    public User findUserById(Long userId) {
        return User.find.byId(userId);
    }
}