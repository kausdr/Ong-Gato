package br.com.pucpr.gatosong.donation.dto;

import br.com.pucpr.gatosong.donation.model.DonationType;
import br.com.pucpr.gatosong.user.dto.UserResponseDTO;
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
    public DonationType type;
}
