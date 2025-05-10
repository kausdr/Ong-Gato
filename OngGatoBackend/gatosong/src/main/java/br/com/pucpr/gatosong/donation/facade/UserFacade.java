package br.com.pucpr.gatosong.donation.facade;


import br.com.pucpr.gatosong.donation.dto.UserDTO;
import br.com.pucpr.gatosong.donation.dto.UserResponseDTO;
import br.com.pucpr.gatosong.donation.model.UserModel;

import java.util.List;

public interface UserFacade {
    UserModel populateUserModel(UserDTO dto);

    UserResponseDTO populateUserResponseDTO(UserModel source);

    UserModel deleteUser(Long id);

    List<UserResponseDTO> createUser(UserModel userModel) throws Exception;

    List<UserResponseDTO> getAllUsers() throws Exception;

    List<UserResponseDTO> getUserById(Long id) throws Exception;
}
