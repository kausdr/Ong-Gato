package br.com.pucpr.gatosong.userType.repository;

import br.com.pucpr.gatosong.userType.model.UserTypeModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserTypeRepository extends JpaRepository<UserTypeModel,Long> {
}
