package br.com.pucpr.gatosong.donation.service.impl;

import br.com.pucpr.gatosong.donation.model.UserModel;
import br.com.pucpr.gatosong.donation.model.UserTypeModel;
import br.com.pucpr.gatosong.donation.repository.UserRepository;
import br.com.pucpr.gatosong.donation.repository.UserTypeRepository;
import br.com.pucpr.gatosong.donation.service.UserService;
import br.com.pucpr.gatosong.donation.service.UserTypeService;
import lombok.NoArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@NoArgsConstructor
public class DefaultUserTypeService implements UserTypeService {

    private static final Logger logger = LogManager.getLogger(DefaultUserTypeService.class);

    @Autowired
    private UserTypeRepository userTypeRepository;

    @Override
    public List<UserTypeModel> getAllUserTypes() {

        List<UserTypeModel> list = userTypeRepository.findAll();

        if (list.isEmpty()) {
            return null;
        }

        return list;
    }

    @Override
    public List<UserTypeModel> getUserTypeById(Long id) {

        Optional<UserTypeModel> userTypeModel = userTypeRepository.findById(id);

        return userTypeModel.map(Collections::singletonList).orElse(null);
    }

    @Override
    public List<UserTypeModel> createUserType(UserTypeModel userTypeModel) {

        UserTypeModel model = null;

        if(!ObjectUtils.isEmpty(userTypeModel)) {
            try {
                model = userTypeRepository.save(userTypeModel);
            }catch (Exception e) {
                logger.error("Unable to save UserTypeModel", e);
            }
        }

        return ObjectUtils.isEmpty(model)? null : Collections.singletonList(model);
    }

    @Override
    public UserTypeModel updateUserType(UserTypeModel userTypeModel) {

        UserTypeModel model = null;

        if(!ObjectUtils.isEmpty(userTypeModel) && userTypeRepository.existsById(userTypeModel.getId())) {
            try {
                model = userTypeRepository.save(userTypeModel);
            }catch (Exception e) {
                logger.error("Unable to save UserTypeModel", e);
            }
        }

        return ObjectUtils.isEmpty(model)? null : model;
    }

    @Override
    public void deleteUserTypeModel(Long id) {
        if(userTypeRepository.existsById(id)) {
            try {
                userTypeRepository.deleteById(id);
            }catch (Exception e) {
                logger.error("Unable to delete UserTypeModel", e);
            }
        }
    }
}
