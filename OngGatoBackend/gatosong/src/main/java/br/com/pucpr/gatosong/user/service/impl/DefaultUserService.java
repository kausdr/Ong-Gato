package br.com.pucpr.gatosong.user.service.impl;

import br.com.pucpr.gatosong.user.dto.LoginResponse;
import br.com.pucpr.gatosong.user.model.UserModel;
import br.com.pucpr.gatosong.security.Jwt;
import br.com.pucpr.gatosong.user.repository.UserRepository;
import br.com.pucpr.gatosong.user.service.UserService;
import lombok.AllArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.modelmapper.ModelMapper;
import br.com.pucpr.gatosong.user.dto.UserResponseDTO;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class DefaultUserService implements UserService {

    private static final Logger logger = LogManager.getLogger(DefaultUserService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final Jwt jwt;
    private final ModelMapper modelMapper;

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
        return userRepository.findById(userModel.getId())
                .map(existingUser -> {
                    existingUser.setFirstName(userModel.getFirstName());
                    existingUser.setLastName(userModel.getLastName());
                    existingUser.setTelephone(userModel.getTelephone());
                    existingUser.setAddress(userModel.getAddress());
                    existingUser.setZipCode(userModel.getZipCode());
                    existingUser.setProfilePicture(userModel.getProfilePicture());
                    return userRepository.save(existingUser);
                })
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com ID: " + userModel.getId()));
    }

    @Override
    public void deleteUser(Long id) {
        if(userRepository.existsById(id)) {
            try {
                userRepository.deleteById(id);
            }catch (Exception e) {
                logger.error("Unable to delete User", e);
            }
        }
    }

    @Override
    public LoginResponse login(String email, String rawPassword) {

        UserModel userModel = userRepository.findByEmail(email);
        if (userModel == null || !passwordEncoder.matches(rawPassword, userModel.getPassword())) {
            throw new BadCredentialsException("Credenciais inválidas");
        }
        UserResponseDTO userResponseDTO = modelMapper.map(userModel, UserResponseDTO.class);
        return new LoginResponse(jwt.createToken(userModel), userResponseDTO);
    }

    @Override
    public void updateUserRole(Long id, boolean isAdmin) {
        userRepository.updateUserRole(id, isAdmin);
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