package dto;

import models.Transaction;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class TransactionResponse {

    private Long transactionId;
    private String merchantName;
    private String merchantCategory;
    private String merchantLocation;
    private Double amount;
    private String currency;
    private LocalDate transactionDate;
    private LocalTime transactionTime;
    private String paymentMode;
    private String status;
    private String referenceNumber;
    private String remarks;
    private LocalDateTime createdAt;
    private Long cardId;

    public TransactionResponse(Transaction transaction) {
        this.transactionId = transaction.getTransactionId();
        this.merchantName = transaction.getMerchantName();
        this.merchantCategory = transaction.getMerchantCategory();
        this.merchantLocation = transaction.getMerchantLocation();
        this.amount = transaction.getAmount();
        this.currency = transaction.getCurrency();
        this.transactionDate = transaction.getTransactionDate();
        this.transactionTime = transaction.getTransactionTime();
        this.paymentMode = transaction.getPaymentMode();
        this.status = transaction.getStatus();
        this.referenceNumber = transaction.getReferenceNumber();
        this.remarks = transaction.getRemarks();
        this.createdAt = transaction.getCreatedAt();

        if (transaction.getCard() != null) {
            this.cardId = transaction.getCard().getCardId();
        }
    }

    public Long getTransactionId() {
        return transactionId;
    }

    public String getMerchantName() {
        return merchantName;
    }

    public String getMerchantCategory() {
        return merchantCategory;
    }

    public String getMerchantLocation() {
        return merchantLocation;
    }

    public Double getAmount() {
        return amount;
    }

    public String getCurrency() {
        return currency;
    }

    public LocalDate getTransactionDate() {
        return transactionDate;
    }

    public LocalTime getTransactionTime() {
        return transactionTime;
    }

    public String getPaymentMode() {
        return paymentMode;
    }

    public String getStatus() {
        return status;
    }

    public String getReferenceNumber() {
        return referenceNumber;
    }

    public String getRemarks() {
        return remarks;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public Long getCardId() {
        return cardId;
    }
}