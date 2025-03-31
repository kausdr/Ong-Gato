package br.com.pucpr.gatosong.facade;

import br.com.pucpr.gatosong.dto.UserDTO;
import br.com.pucpr.gatosong.model.UserModel;

public interface UserFacade {
    UserModel populateUserModel(UserDTO dto);

    UserModel deleteUser(Long id);
}
