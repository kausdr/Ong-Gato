package br.com.pucpr.gatosong.donation.repository;

import br.com.pucpr.gatosong.donation.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserModel,Long> {
    boolean existsByEmail(String email);

    boolean existsByCpf(String cpf);
}
