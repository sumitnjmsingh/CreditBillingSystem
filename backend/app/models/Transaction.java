package models;

import com.avaje.ebean.Model;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "transactions")
public class Transaction extends Model {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionId;

    @Column(nullable = false)
    private String merchantName;

    @Column(nullable = false)
    private String merchantCategory;

    @Column
    private String merchantLocation;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private String currency;

    @Column(nullable = false)
    private LocalDate transactionDate;

    @Column(nullable = false)
    private LocalTime transactionTime;

    @Column(nullable = false)
    private String paymentMode;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false, unique = true)
    private String referenceNumber;

    @Column
    private Boolean billed = false;

    @Column(length = 500)
    private String remarks;

    @Column
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_id")
    private CreditCard card;

    public static final Finder<Long, Transaction> find = new Finder<>(Transaction.class);

    public Transaction() {
    }

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }

    public Long getTransactionId() {
        return transactionId;
    }

    public void setBilled(Boolean billed) {
        this.billed = billed;
    }

    public boolean getBilled() {
        return billed;
    }

    public void setTransactionId(Long transactionId) {
        this.transactionId = transactionId;
    }

    public String getMerchantName() {
        return merchantName;
    }

    public void setMerchantName(String merchantName) {
        this.merchantName = merchantName;
    }

    public String getMerchantCategory() {
        return merchantCategory;
    }

    public void setMerchantCategory(String merchantCategory) {
        this.merchantCategory = merchantCategory;
    }

    public String getMerchantLocation() {
        return merchantLocation;
    }

    public void setMerchantLocation(String merchantLocation) {
        this.merchantLocation = merchantLocation;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public LocalDate getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(LocalDate transactionDate) {
        this.transactionDate = transactionDate;
    }

    public LocalTime getTransactionTime() {
        return transactionTime;
    }

    public void setTransactionTime(LocalTime transactionTime) {
        this.transactionTime = transactionTime;
    }

    public String getPaymentMode() {
        return paymentMode;
    }

    public void setPaymentMode(String paymentMode) {
        this.paymentMode = paymentMode;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getReferenceNumber() {
        return referenceNumber;
    }

    public void setReferenceNumber(String referenceNumber) {
        this.referenceNumber = referenceNumber;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public CreditCard getCard() {
        return card;
    }

    public void setCard(CreditCard card) {
        this.card = card;
    }
}