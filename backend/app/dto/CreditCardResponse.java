package dto;

import models.CreditCard;
import models.User;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class CreditCardResponse {

    private Long cardId;
    private String cardNumber;
    private String cardHolderName;
    private LocalDate expiryDate;
    private String encryptedCvv;
    private String cardType;
    private String cardVariant;
    private double creditLimit;
    private double availableLimit;
    private double usedLimit;
    private boolean blocked;
    private boolean active;
    private String status;
    private Integer billingDate;
    private Integer paymentDueDate;
    private LocalDate joiningDate;
    private Integer rewardPoints;
    private Double cashbackEarned;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Include only if you want user information
    private User user;

    public CreditCardResponse(CreditCard card) {
        this.cardId = card.getCardId();
        this.cardNumber = card.getCardNumber();
        this.cardHolderName = card.getCardHolderName();
        this.expiryDate = card.getExpiryDate();
        this.encryptedCvv = card.getEncryptedCvv();
        this.cardType = card.getCardType();
        this.cardVariant = card.getCardVariant();
        this.creditLimit = card.getCreditLimit();
        this.availableLimit = card.getAvailableLimit();
        this.usedLimit = card.getUsedLimit();
        this.blocked = card.isBlocked();
        this.active = card.isActive();
        this.status = card.getStatus();
        this.billingDate = card.getBillingDate();
        this.paymentDueDate = card.getPaymentDueDate();
        this.joiningDate = card.getJoiningDate();
        this.rewardPoints = card.getRewardPoints();
        this.cashbackEarned = card.getCashbackEarned();
        this.createdAt = card.getCreatedAt();
        this.updatedAt = card.getUpdatedAt();

        // Optional
        this.user = card.getUser();
    }

    // Generate getters only
    public Long getCardId() {
        return cardId;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public String getCardHolderName() {
        return cardHolderName;
    }

    public LocalDate getExpiryDate() {
        return expiryDate;
    }

    public String getEncryptedCvv() {
        return encryptedCvv;
    }

    public String getCardType() {
        return cardType;
    }

    public String getCardVariant() {
        return cardVariant;
    }

    public double getCreditLimit() {
        return creditLimit;
    }

    public double getAvailableLimit() {
        return availableLimit;
    }

    public double getUsedLimit() {
        return usedLimit;
    }

    public boolean isBlocked() {
        return blocked;
    }

    public boolean isActive() {
        return active;
    }

    public String getStatus() {
        return status;
    }

    public Integer getBillingDate() {
        return billingDate;
    }

    public Integer getPaymentDueDate() {
        return paymentDueDate;
    }

    public LocalDate getJoiningDate() {
        return joiningDate;
    }

    public Integer getRewardPoints() {
        return rewardPoints;
    }

    public Double getCashbackEarned() {
        return cashbackEarned;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public User getUser() {
        return user;
    }
}