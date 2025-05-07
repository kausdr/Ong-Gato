package br.com.pucpr.gatosong.donation.dto;

import br.com.pucpr.gatosong.typeDonation.dto.TypeDonationDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class DonationResponseDTO {

    public Long id;
    public BigDecimal amount;
    public Date date;
    public UserResponseDTO donator;
    public TypeDonationDTO type;


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

    public UserResponseDTO getDonator() {
        return donator;
    }

    public void setDonator(UserResponseDTO donator) {
        this.donator = donator;
    }

    public TypeDonationDTO getType() {
        return type;
    }

    public void setType(TypeDonationDTO type) {
        this.type = type;
    }
}
