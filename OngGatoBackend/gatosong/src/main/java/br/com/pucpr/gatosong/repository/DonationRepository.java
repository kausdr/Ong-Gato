package br.com.pucpr.gatosong.repository;

import br.com.pucpr.gatosong.model.DonationModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DonationRepository extends JpaRepository<DonationModel,Long> {
}
