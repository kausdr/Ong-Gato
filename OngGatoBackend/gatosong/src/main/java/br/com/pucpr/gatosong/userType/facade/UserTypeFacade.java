package br.com.pucpr.gatosong.userType.facade;

import br.com.pucpr.gatosong.userType.dto.UserTypeDTO;
import br.com.pucpr.gatosong.userType.model.UserTypeModel;

public interface UserTypeFacade {
    UserTypeModel populateUserTypeModel(UserTypeDTO dto);

    UserTypeModel deleteUserType(Long id);
}
