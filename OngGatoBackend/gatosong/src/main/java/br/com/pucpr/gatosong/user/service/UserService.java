package br.com.pucpr.gatosong.user.service;

import br.com.pucpr.gatosong.user.dto.LoginResponse;
import br.com.pucpr.gatosong.user.model.UserModel;
import java.util.List;

public interface UserService {
    List<UserModel> getAllUsers();

    List<UserModel> getUserById(Long id);

    List<UserModel> createUser(UserModel userModel);

    UserModel updateUser(UserModel target);

    void deleteUser(Long id);

    LoginResponse login(String username, String password);

    void updateUserRole(Long id, boolean isAdmin);

    boolean existsByCPF(String cpf);

    boolean existsByEmail(String email);

    UserModel updateProfilePicture(Long id, String imageUrl);
}