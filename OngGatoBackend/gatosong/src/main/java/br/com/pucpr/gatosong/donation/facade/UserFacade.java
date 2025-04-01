package br.com.pucpr.gatosong.donation.facade;


import br.com.pucpr.gatosong.donation.dto.UserDTO;
import br.com.pucpr.gatosong.donation.dto.UserResponseDTO;
import br.com.pucpr.gatosong.donation.model.UserModel;

public interface UserFacade {
    UserModel populateUserModel(UserDTO dto);

    UserResponseDTO populateUserResponseDTO(UserModel source);

    UserModel deleteUser(Long id);
}
