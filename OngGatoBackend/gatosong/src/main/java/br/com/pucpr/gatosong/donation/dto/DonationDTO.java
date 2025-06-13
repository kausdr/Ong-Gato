package br.com.pucpr.gatosong.donation.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.util.Date;

@Data
public class DonationDTO {

    public Long id;
    public BigDecimal amount;
    public Long donator;
    public Date date;
    public Long type;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Long getDonator() {
        return donator;
    }

    public void setDonator(Long donator) {
        this.donator = donator;
    }

    public Long getType() {
        return type;
    }

    public void setType(Long type) {
        this.type = type;
    }
}
