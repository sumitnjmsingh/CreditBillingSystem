package models;

import com.avaje.ebean.Model;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reward_transactions")
public class RewardTransaction extends Model {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rewardId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_id")
    private CreditCard card;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "transaction_id")
    private Transaction transaction;

    @Column(nullable = false)
    private Integer pointsEarned;

    @Column(nullable = false)
    private Integer pointsRedeemed;

    @Column(nullable = false)
    private Integer balanceAfterTransaction;

    @Column(nullable = false)
    private String rewardType;

    @Column
    private String remarks;

    @Column
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }

    public static final Finder<Long, RewardTransaction> find = new Finder<>(RewardTransaction.class);

    public Long getRewardId() {
        return rewardId;
    }

    public CreditCard getCard() {
        return card;
    }

    public Transaction getTransaction() {
        return transaction;
    }

    public Integer getPointsEarned() {
        return pointsEarned;
    }

    public Integer getPointsRedeemed() {
        return pointsRedeemed;
    }

    public Integer getBalanceAfterTransaction() {
        return balanceAfterTransaction;
    }

    public String getRewardType() {
        return rewardType;
    }

    public String getRemarks() {
        return remarks;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setRewardId(Long rewardId) {
        this.rewardId = rewardId;
    }

    public void setCard(CreditCard card) {
        this.card = card;
    }

    public void setTransaction(Transaction transaction) {
        this.transaction = transaction;
    }

    public void setPointsEarned(Integer pointsEarned) {
        this.pointsEarned = pointsEarned;
    }

    public void setPointsRedeemed(Integer pointsRedeemed) {
        this.pointsRedeemed = pointsRedeemed;
    }

    public void setBalanceAfterTransaction(Integer balanceAfterTransaction) {
        this.balanceAfterTransaction = balanceAfterTransaction;
    }

    public void setRewardType(String rewardType) {
        this.rewardType = rewardType;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}