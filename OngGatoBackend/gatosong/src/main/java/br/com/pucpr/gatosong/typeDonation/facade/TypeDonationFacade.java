package br.com.pucpr.gatosong.typeDonation.facade;

import br.com.pucpr.gatosong.typeDonation.dto.TypeDonationDTO;
import br.com.pucpr.gatosong.typeDonation.model.TypeDonationModel;

public interface TypeDonationFacade {

    TypeDonationModel populateTypeDonationModel(TypeDonationDTO updateModel);

    TypeDonationModel deleteTypeDonation(Long id);
}
