package br.com.pucpr.gatosong.donation.service;

import br.com.pucpr.gatosong.donation.model.DonationModel;
import br.com.pucpr.gatosong.donation.model.UserModel;

import java.util.List;

public interface UserService {
    List<UserModel> getAllUsers();

    List<UserModel> getUserById(Long id);

    List<UserModel> createUser(UserModel userModel);

    UserModel updateUser(UserModel target);

    void deleteUserModel(Long id);

    boolean existsByCPF(String cpf);

    boolean existsByEmail(String email);
}
