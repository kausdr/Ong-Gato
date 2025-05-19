package br.com.pucpr.gatosong.user.facade.impl;

import br.com.pucpr.gatosong.user.dto.UserDTO;
import br.com.pucpr.gatosong.user.dto.UserResponseDTO;
import br.com.pucpr.gatosong.user.facade.UserFacade;
import br.com.pucpr.gatosong.user.model.UserModel;
import br.com.pucpr.gatosong.donation.service.DonationService;
import br.com.pucpr.gatosong.user.service.UserService;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Component
public class DefaultUserFacade implements UserFacade {

    private static final Logger logger = LogManager.getLogger(DefaultUserFacade.class);

    @Autowired
    private UserService userService;

    @Autowired
    private DonationService donationService;

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
        target.setDonations(donationService.getDonationById(source.getId()));

        return userService.updateUser(target);
    }

    @Override
    public UserResponseDTO populateUserResponseDTO(UserModel source) {
        UserResponseDTO target = new UserResponseDTO();

        target.setId(source.getId());
        target.setTelephone(source.getTelephone());
        target.setName(source.getName());
        target.setAddress(source.getAddress());
        target.setEmail(source.getEmail());

        return target;
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

    @Override
    public List<UserResponseDTO> createUser(UserModel userModel) throws Exception {
        if (checkIfUserEmailExists(userModel.getEmail())){
            throw new Exception("User email already being used");
        }

        if (checkIfUserCpfExists(userModel.getCpf())){
            throw new Exception("User cpf already being used");
        }

        List<UserResponseDTO> response = new ArrayList<>();

        List<UserModel> model = this.userService.createUser(userModel);

        if (!CollectionUtils.isEmpty(model)){
             response.add(populateUserResponseDTO(model.getFirst()));
        }

        return response;
    }

    @Override
    public List<UserResponseDTO> getAllUsers() throws Exception {
        try {
            List<UserResponseDTO> responseDTOList = new ArrayList<>();

            List<UserModel> models = this.userService.getAllUsers();

            for (UserModel model : models){
                responseDTOList.add(populateUserResponseDTO(model));
            }

            return responseDTOList;
        }catch (Exception e){
            throw new Exception("Unable to get users");
        }
    }

    @Override
    public List<UserResponseDTO> getUserById(Long id) throws Exception {
        try {
            List<UserResponseDTO> responseDTOList = new ArrayList<>();

            List<UserModel> models = this.userService.getUserById(id);

            for (UserModel model : models){
                responseDTOList.add(populateUserResponseDTO(model));
            }

            return responseDTOList;
        }catch (Exception e){
            throw new Exception("Unable to get user");
        }
    }

    @Override
    public List<UserResponseDTO> getDonators() throws Exception {
        try {
            List<UserResponseDTO> responseDTOList = new ArrayList<>();

            List<UserModel> models = this.userService.getUsersWithDonations();

            for (UserModel model : models){
                responseDTOList.add(populateUserResponseDTO(model));
            }

            return responseDTOList;
        }catch (Exception e){
            throw new Exception("Unable to get users");
        }
    }

    private boolean checkIfUserCpfExists(String cpf) {
        return userService.existsByCPF(cpf);
    }

    private boolean checkIfUserEmailExists(String email){
        return userService.existsByEmail(email);
    }
}
