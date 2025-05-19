package br.com.pucpr.gatosong.donation.model;

import br.com.pucpr.gatosong.typeDonation.model.TypeDonationModel;
import br.com.pucpr.gatosong.user.model.UserModel;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.Date;

@Entity
public class DonationModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "code", unique = true, nullable = false)
    private Long id;

    @Column(name = "amount")
    private BigDecimal amount;

    @Column(name = "date")
    private Date date;

    @ManyToOne
    @JoinColumn(name = "user_code", nullable = false)
    private UserModel donator;

    @ManyToOne
    @JoinColumn(name = "type_code", nullable = false)
    private TypeDonationModel type;

    public DonationModel() {
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public UserModel getDonator() {
        return donator;
    }

    public void setDonator(UserModel donator) {
        this.donator = donator;
    }

    public TypeDonationModel getType() {
        return type;
    }

    public void setType(TypeDonationModel type) {
        this.type = type;
    }
}
