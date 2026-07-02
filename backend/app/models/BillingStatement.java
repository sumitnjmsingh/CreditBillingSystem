package models;

import com.avaje.ebean.Model;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "billing_statements")
public class BillingStatement extends Model {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long statementId;

    @Column
    private Double previousBalance;

    @Column
    private Double currentBalance;

    @Column
    private Double outstandingBalance;

    @Column
    private Double minimumDue;

    @Column
    private Double interest;

    @Column
    private Double lateFee;

    @Column
    private Double gst;

    @Column
    private Double availableCredit;

    @Column
    private LocalDate billingDate;

    @Column
    private LocalDate dueDate;

    @Column
    private Boolean paid = false;

    @Column
    private Double payment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_id")
    private CreditCard card;

    @Column
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public static final Finder<Long, BillingStatement> find = new Finder<>(BillingStatement.class);


    // Getters

    public Long getStatementId() {
        return statementId;
    }

    public Double getPayment() {
        return payment;
    }

    public void setPayment(Double payment) {
        this.payment = payment;
    }

    public CreditCard getCard() {
        return card;
    }

    public Double getPreviousBalance() {
        return previousBalance;
    }

    public Double getCurrentBalance() {
        return currentBalance;
    }

    public Double getOutstandingBalance() {
        return outstandingBalance;
    }

    public Double getMinimumDue() {
        return minimumDue;
    }

    public Double getInterest() {
        return interest;
    }

    public Double getLateFee() {
        return lateFee;
    }

    public Double getGst() {
        return gst;
    }

    public Double getAvailableCredit() {
        return availableCredit;
    }

    public LocalDate getBillingDate() {
        return billingDate;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public Boolean getPaid() {
        return paid;
    }


// Setters

    public void setStatementId(Long statementId) {
        this.statementId = statementId;
    }

    public void setCard(CreditCard card) {
        this.card = card;
    }

    public void setPreviousBalance(Double previousBalance) {
        this.previousBalance = previousBalance;
    }

    public void setCurrentBalance(Double currentBalance) {
        this.currentBalance = currentBalance;
    }

    public void setOutstandingBalance(Double outstandingBalance) {
        this.outstandingBalance = outstandingBalance;
    }

    public void setMinimumDue(Double minimumDue) {
        this.minimumDue = minimumDue;
    }

    public void setInterest(Double interest) {
        this.interest = interest;
    }

    public void setLateFee(Double lateFee) {
        this.lateFee = lateFee;
    }

    public void setGst(Double gst) {
        this.gst = gst;
    }

    public void setAvailableCredit(Double availableCredit) {
        this.availableCredit = availableCredit;
    }

    public void setBillingDate(LocalDate billingDate) {
        this.billingDate = billingDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public void setPaid(Boolean paid) {
        this.paid = paid;
    }
}