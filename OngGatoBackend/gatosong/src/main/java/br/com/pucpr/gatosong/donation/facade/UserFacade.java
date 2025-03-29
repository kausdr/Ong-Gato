package br.com.pucpr.gatosong.donation.facade;

import br.com.pucpr.gatosong.donation.dto.UserDTO;
import br.com.pucpr.gatosong.donation.model.UserModel;

public interface UserFacade {
    UserModel populateUserModel(UserDTO dto);

    UserModel deleteUser(Long id);
}
