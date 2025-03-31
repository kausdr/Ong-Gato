package br.com.pucpr.gatosong.repository;

import br.com.pucpr.gatosong.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserModel,Long> {
}
