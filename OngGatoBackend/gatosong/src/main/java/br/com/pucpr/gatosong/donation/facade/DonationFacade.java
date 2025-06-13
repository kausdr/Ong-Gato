package br.com.pucpr.gatosong.donation.facade;

import br.com.pucpr.gatosong.donation.dto.DonationDTO;
import br.com.pucpr.gatosong.donation.dto.DonationResponseDTO;
import br.com.pucpr.gatosong.donation.model.DonationModel;
import java.util.List;

public interface DonationFacade {

    DonationResponseDTO populateResponseDTO(DonationModel source);

    DonationModel deleteDonation(Long id);

    DonationModel populateDonationModel(DonationDTO updateModel);

    DonationResponseDTO createDonation(DonationDTO donation);

    DonationResponseDTO updateDonation(DonationDTO donation);

    List<DonationResponseDTO> getAllDonations();

    List<DonationResponseDTO> getDonationById(Long id);
}
