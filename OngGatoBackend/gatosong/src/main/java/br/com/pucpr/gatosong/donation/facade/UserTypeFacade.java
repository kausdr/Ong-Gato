package br.com.pucpr.gatosong.donation.facade;

import br.com.pucpr.gatosong.donation.dto.UserTypeDTO;
import br.com.pucpr.gatosong.donation.model.UserTypeModel;

public interface UserTypeFacade {
    UserTypeModel populateUserTypeModel(UserTypeDTO dto);

    UserTypeModel deleteUserType(Long id);
}
