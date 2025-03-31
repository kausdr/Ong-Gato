package br.com.pucpr.gatosong.donation.facade;

import br.com.pucpr.gatosong.donation.dto.DonationDTO;
import br.com.pucpr.gatosong.donation.model.DonationModel;

public interface DonationFacade {

    DonationModel deleteDonation(Long id);

    DonationModel populateDonationModel(DonationDTO updateModel);
}
