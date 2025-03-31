package br.com.pucpr.gatosong.donation.repository;

import br.com.pucpr.gatosong.donation.model.UserTypeModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserTypeRepository extends JpaRepository<UserTypeModel,Long> {
}
