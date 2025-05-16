package br.com.pucpr.gatosong.service.impl;

import br.com.pucpr.gatosong.dto.LoginResponse;
import br.com.pucpr.gatosong.dto.UserResponse;
import br.com.pucpr.gatosong.model.UserModel;
import br.com.pucpr.gatosong.repository.UserRepository;
import br.com.pucpr.gatosong.security.Jwt;
import br.com.pucpr.gatosong.service.UserService;
import lombok.NoArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.support.ResourceTransactionManager;
import org.springframework.util.ObjectUtils;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@NoArgsConstructor
public class DefaultUserService implements UserService {

    private static final Logger logger = LogManager.getLogger(DefaultUserService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Jwt jwt;

    @Override
    public List<UserModel> getAllUsers() {

        List<UserModel> list = userRepository.findAll();

        if (list.isEmpty()) {
            return null;
        }

        return list;
    }

    @Override
    public List<UserModel> getUserById(Long id) {

        Optional<UserModel> userModel = userRepository.findById(id);

        return userModel.map(Collections::singletonList).orElse(null);
    }

    @Override
    public List<UserModel> createUser(UserModel userModel) {

        UserModel model = null;

        if(!ObjectUtils.isEmpty(userModel)) {
            try {
                model = userRepository.save(userModel);
            }catch (Exception e) {
                logger.error("Unable to save UserModel", e);
            }
        }

        return ObjectUtils.isEmpty(model)? null : Collections.singletonList(model);
    }

    @Override
    public UserModel updateUser(UserModel userModel) {

        UserModel model = null;

        if(!ObjectUtils.isEmpty(userModel) && userRepository.existsById(userModel.getId())) {
            try {
                model = userRepository.save(userModel);
            }catch (Exception e) {
                logger.error("Unable to save UserModel", e);
            }
        }

        return ObjectUtils.isEmpty(model)? null : model;
    }

    @Override
    public void deleteUserModel(Long id) {
        if(userRepository.existsById(id)) {
            try {
                userRepository.deleteById(id);
            }catch (Exception e) {
                logger.error("Unable to delete UserModel", e);
            }
        }
    }

    @Override
    public LoginResponse login(String username, String password) {

        UserModel userModel = userRepository.findByEmail(username);
        if( userModel == null || userModel.getPassword() == null) {
            return null;
        }
        return new LoginResponse(jwt.createToken(userModel), new UserResponse(userModel));
    }
}
