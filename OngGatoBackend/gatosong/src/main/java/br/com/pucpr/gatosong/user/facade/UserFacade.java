package br.com.pucpr.gatosong.user.facade;

import br.com.pucpr.gatosong.user.dto.UserDTO;
import br.com.pucpr.gatosong.user.dto.UserResponseDTO;
import br.com.pucpr.gatosong.user.model.UserModel;

import java.util.List;

public interface UserFacade {

    UserModel fromDto(UserDTO dto);

    UserModel populateUserModel(UserDTO dto);

    UserResponseDTO populateUserResponseDTO(UserModel source);

    UserModel deleteUser(Long id);

    List<UserResponseDTO> createUser(UserModel userModel) throws Exception;

    List<UserResponseDTO> getAllUsers() throws Exception;

    List<UserResponseDTO> getUserById(Long id) throws Exception;
}

