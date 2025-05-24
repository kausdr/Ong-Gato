package br.com.pucpr.gatosong.user.service.impl;

import br.com.pucpr.gatosong.user.dto.LoginResponse;
import br.com.pucpr.gatosong.user.dto.UserResponse;
import br.com.pucpr.gatosong.user.model.UserModel;
import br.com.pucpr.gatosong.security.Jwt;
import br.com.pucpr.gatosong.user.repository.UserRepository;
import br.com.pucpr.gatosong.user.service.UserService;
import lombok.NoArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
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

    @Autowired
    private PasswordEncoder passwordEncoder;

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
        if (!ObjectUtils.isEmpty(userModel)) {
            try {
                userModel.setPassword(passwordEncoder.encode(userModel.getPassword()));
                UserModel saved = userRepository.save(userModel);
                return Collections.singletonList(saved);
            } catch (Exception e) {
                logger.error("Unable to save UserModel", e);
            }
        }
        return null;
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
    public LoginResponse login(String email, String rawPassword) {

        UserModel userModel = userRepository.findByEmail(email);
        if (userModel == null || !passwordEncoder.matches(rawPassword, userModel.getPassword())) {
            throw new BadCredentialsException("Credenciais inválidas");
        }
        return new LoginResponse(jwt.createToken(userModel), new UserResponse(userModel));
    }

    @Override
    public boolean existsByCPF(String cpf) {
        return userRepository.existsByCpf(cpf);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}