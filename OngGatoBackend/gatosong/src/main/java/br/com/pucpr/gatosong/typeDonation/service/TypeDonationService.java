package br.com.pucpr.gatosong.typeDonation.service;

import br.com.pucpr.gatosong.typeDonation.model.TypeDonationModel;

import java.util.List;

public interface TypeDonationService {
    List<TypeDonationModel> getAllTypeDonations();

    List<TypeDonationModel> getTypeDonationById(Long id);

    List<TypeDonationModel> createTypeDonation(TypeDonationModel donationModel);

    TypeDonationModel updateTypeDonation(TypeDonationModel target);

    void deleteTypeDonationModel(Long id);
}
