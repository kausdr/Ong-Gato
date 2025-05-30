package br.com.pucpr.gatosong.user.service;

import br.com.pucpr.gatosong.user.dto.LoginResponse;
import br.com.pucpr.gatosong.user.model.UserModel;
import java.util.List;

public interface UserService {
    List<UserModel> getAllUsers();

    List<UserModel> getUserById(Long id);

    List<UserModel> createUser(UserModel userModel);

    UserModel updateUser(UserModel target);

    void deleteUserModel(Long id);

    LoginResponse login(String username, String password);

    boolean existsByCPF(String cpf);

    boolean existsByEmail(String email);
}