package br.com.pucpr.gatosong.service;

import br.com.pucpr.gatosong.model.DonationModel;

import java.util.List;

public interface DonationService {
    List<DonationModel> getAllDonations();

    List<DonationModel> getDonationById(Long id);

    List<DonationModel> createDonation(DonationModel donationModel);

    DonationModel updateDonation(DonationModel target);

    void deleteDonationModel(Long id);
}
