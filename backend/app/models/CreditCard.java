package models;

import com.avaje.ebean.Model;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "credit_cards")
public class CreditCard extends Model {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cardId;

    @Column(nullable = false, unique = true)
    private String cardNumber;

    @Column(nullable = false)
    private String cardHolderName;

    @Column(nullable = false)
    private LocalDate expiryDate;

    @Column(nullable = false)
    private String encryptedCvv;

    @Column(nullable = false)
    private String cardType;          // VISA, MasterCard, RuPay

    @Column(nullable = false)
    private String cardVariant;       // Platinum, Gold, Signature

    @Column(nullable = false)
    private double creditLimit;

    @Column(nullable = false)
    private double availableLimit;

    @Column(nullable = false)
    private double usedLimit = 0D;

    @Column(nullable = false)
    private boolean blocked = false;

    @Column(nullable = false)
    private boolean active = true;

    @Column(nullable = false)
    private String status = "ACTIVE";

    @Column(nullable = false)
    private Integer billingDate;

    @Column(nullable = false)
    private Integer paymentDueDate;

    @Column(nullable = false)
    private LocalDate joiningDate;

    @Column
    private Integer rewardPoints = 0;

    @Column
    private Double cashbackEarned = 0.0;

    @Column
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "card", cascade = CascadeType.ALL)
    private List<Transaction> transactions = new ArrayList<>();

    @OneToMany(mappedBy = "card")
    private List<BillingStatement> billingStatements;

    public static final Finder<Long, CreditCard> find = new Finder<>(CreditCard.class);

    public CreditCard() {
    }

    @PrePersist
    public void prePersist() {

        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();

    }

    @PreUpdate
    public void preUpdate() {

        updatedAt = LocalDateTime.now();

    }

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

    public List<Transaction> getTransactions() {
        return transactions;
    }


    public void setCardId(Long cardId) {
        this.cardId = cardId;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public void setCardHolderName(String cardHolderName) {
        this.cardHolderName = cardHolderName;
    }

    public void setExpiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
    }

    public void setEncryptedCvv(String encryptedCvv) {
        this.encryptedCvv = encryptedCvv;
    }

    public void setCardType(String cardType) {
        this.cardType = cardType;
    }

    public void setCardVariant(String cardVariant) {
        this.cardVariant = cardVariant;
    }

    public void setCreditLimit(double creditLimit) {
        this.creditLimit = creditLimit;
    }

    public void setAvailableLimit(double availableLimit) {
        this.availableLimit = availableLimit;
    }

    public void setUsedLimit(double usedLimit) {
        this.usedLimit = usedLimit;
    }

    public void setBlocked(boolean blocked) {
        this.blocked = blocked;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setBillingDate(Integer billingDate) {
        this.billingDate = billingDate;
    }

    public void setPaymentDueDate(Integer paymentDueDate) {
        this.paymentDueDate = paymentDueDate;
    }

    public void setJoiningDate(LocalDate joiningDate) {
        this.joiningDate = joiningDate;
    }

    public void setRewardPoints(Integer rewardPoints) {
        this.rewardPoints = rewardPoints;
    }

    public void setCashbackEarned(Double cashbackEarned) {
        this.cashbackEarned = cashbackEarned;
    }


    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setTransactions(List<Transaction> transactions) {
        this.transactions = transactions;
    }

}
