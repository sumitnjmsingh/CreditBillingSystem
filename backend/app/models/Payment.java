package models;

import com.avaje.ebean.Model;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
public class Payment extends Model {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_id")
    private CreditCard card;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private LocalDate paymentDate;

    @Column(nullable = false)
    private String paymentMode;

    @Column(nullable = false)
    private String paymentStatus;

    @Column(nullable = false, unique = true)
    private String referenceNumber;

    @Column(length = 500)
    private String remarks;

    @Column
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }

    public static final Finder<Long, Payment> find = new Finder<>(Payment.class);

    public Long getPaymentId() {
        return paymentId;
    }

    public CreditCard getCard() {
        return card;
    }

    public Double getAmount() {
        return amount;
    }

    public LocalDate getPaymentDate() {
        return paymentDate;
    }

    public String getPaymentMode() {
        return paymentMode;
    }

    public String getPaymentStatus() {
        return paymentStatus;
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

    public void setPaymentId(Long paymentId) {
        this.paymentId = paymentId;
    }

    public void setCard(CreditCard card) {
        this.card = card;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public void setPaymentDate(LocalDate paymentDate) {
        this.paymentDate = paymentDate;
    }

    public void setPaymentMode(String paymentMode) {
        this.paymentMode = paymentMode;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public void setReferenceNumber(String referenceNumber) {
        this.referenceNumber = referenceNumber;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

}