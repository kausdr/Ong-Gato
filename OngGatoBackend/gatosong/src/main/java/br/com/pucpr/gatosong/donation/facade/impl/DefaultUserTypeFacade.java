package br.com.pucpr.gatosong.donation.facade.impl;

import br.com.pucpr.gatosong.donation.dto.UserTypeDTO;
import br.com.pucpr.gatosong.donation.facade.UserTypeFacade;
import br.com.pucpr.gatosong.donation.service.UserTypeService;
import br.com.pucpr.gatosong.donation.model.UserTypeModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Component
public class DefaultUserTypeFacade implements UserTypeFacade {

    private static final Logger logger = LogManager.getLogger(DefaultUserTypeFacade.class);

    @Autowired
    private UserTypeService userTypeService;


    @Override
    public UserTypeModel populateUserTypeModel(UserTypeDTO source) {

        UserTypeModel target = new UserTypeModel();

        target.setId(source.getId());
        target.setUserType(source.getUserType());
        target.setDescription(source.getDescription());

        return userTypeService.updateUserType(target);
    }

    @Override
    public UserTypeModel deleteUserType(Long id) {
        List<UserTypeModel> model = userTypeService.getUserTypeById(id);

        if (model.isEmpty()) {
            logger.error("UserTypeModel not found");
            return null;
        }

        userTypeService.deleteUserTypeModel(id);

        return model.get(0);
    }
}
