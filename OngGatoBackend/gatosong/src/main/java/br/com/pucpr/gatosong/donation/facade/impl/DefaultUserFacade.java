package br.com.pucpr.gatosong.donation.facade.impl;

import br.com.pucpr.gatosong.donation.dto.DonationDTO;
import br.com.pucpr.gatosong.donation.dto.UserDTO;
import br.com.pucpr.gatosong.donation.facade.DonationFacade;
import br.com.pucpr.gatosong.donation.facade.UserFacade;
import br.com.pucpr.gatosong.donation.model.DonationModel;
import br.com.pucpr.gatosong.donation.model.UserModel;
import br.com.pucpr.gatosong.donation.service.DonationService;
import br.com.pucpr.gatosong.donation.service.UserService;
import lombok.AllArgsConstructor;
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
public class DefaultUserFacade implements UserFacade {

    private static final Logger logger = LogManager.getLogger(DefaultUserFacade.class);

    @Autowired
    private UserService userService;


    @Override
    public UserModel populateUserModel(UserDTO source) {
        UserModel target = new UserModel();

        target.setId(source.getId());
        target.setName(source.getName( ));
        target.setBirthDate(source.getBirthDate( ));
        target.setTelephone(source.getTelephone());
        target.setZipCode(source.getZipCode());
        target.setEmail(source.getEmail());
        target.setAddress(source.getAddress());
        target.setPassword(source.getPassword());
        target.setUserTypeID(source.getUserTypeID());

        return userService.updateUser(target);
    }

    @Override
    public UserModel deleteUser(Long id) {
        List<UserModel> model = userService.getUserById(id);

        if (model.isEmpty()) {
            logger.error("UserModel not found");
            return null;
        }

        userService.deleteUserModel(id);

        return model.get(0);
    }
}
