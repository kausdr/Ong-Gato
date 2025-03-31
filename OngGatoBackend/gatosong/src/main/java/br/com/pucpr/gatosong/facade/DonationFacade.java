package br.com.pucpr.gatosong.facade;

import br.com.pucpr.gatosong.dto.DonationDTO;
import br.com.pucpr.gatosong.model.DonationModel;

public interface DonationFacade {
    DonationModel populateDonationModel(DonationDTO dto);

    DonationModel deleteDonation(Long id);
}
