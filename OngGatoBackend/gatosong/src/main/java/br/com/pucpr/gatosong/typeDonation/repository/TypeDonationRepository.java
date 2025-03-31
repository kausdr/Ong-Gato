package br.com.pucpr.gatosong.typeDonation.repository;

import br.com.pucpr.gatosong.typeDonation.model.TypeDonationModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TypeDonationRepository extends JpaRepository<TypeDonationModel, Long> {
}
