package br.com.pucpr.gatosong.repository;

import br.com.pucpr.gatosong.user.dto.UserDTO;
import br.com.pucpr.gatosong.user.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<UserModel,Long> {

    UserModel findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByCpf(String cpf);
}
