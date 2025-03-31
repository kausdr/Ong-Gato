package br.com.pucpr.gatosong.donation.service;

import br.com.pucpr.gatosong.donation.model.UserTypeModel;

import java.util.List;

public interface UserTypeService {
    List<UserTypeModel> getAllUserTypes();

    List<UserTypeModel> getUserTypeById(Long id);

    List<UserTypeModel> createUserType(UserTypeModel userModel);

    UserTypeModel updateUserType(UserTypeModel target);

    void deleteUserTypeModel(Long id);
}
