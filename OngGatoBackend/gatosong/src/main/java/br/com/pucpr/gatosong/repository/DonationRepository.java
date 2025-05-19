package br.com.pucpr.gatosong.repository;

import br.com.pucpr.gatosong.donation.model.DonationModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DonationRepository extends JpaRepository<DonationModel,Long> {
}
