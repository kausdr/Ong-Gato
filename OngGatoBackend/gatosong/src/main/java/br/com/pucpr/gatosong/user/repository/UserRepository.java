package br.com.pucpr.gatosong.user.repository;

import br.com.pucpr.gatosong.user.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserModel,Long> {
    boolean existsByEmail(String email);

    boolean existsByCpf(String cpf);

    List<UserModel> findAllByDonationsIsNotNull();
}
