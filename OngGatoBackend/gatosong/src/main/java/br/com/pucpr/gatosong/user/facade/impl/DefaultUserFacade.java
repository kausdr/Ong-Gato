package br.com.pucpr.gatosong.user.facade.impl;

import br.com.pucpr.gatosong.user.dto.UserDTO;
import br.com.pucpr.gatosong.user.dto.UserResponseDTO;
import br.com.pucpr.gatosong.user.dto.UserUpdateDTO;
import br.com.pucpr.gatosong.user.facade.UserFacade;
import br.com.pucpr.gatosong.user.model.UserModel;
import br.com.pucpr.gatosong.donation.service.DonationService;
import br.com.pucpr.gatosong.user.repository.UserRepository;
import br.com.pucpr.gatosong.user.service.FirebaseStorageService;
import br.com.pucpr.gatosong.user.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import br.com.pucpr.gatosong.security.UserToken;
import br.com.pucpr.gatosong.donation.repository.DonationRepository;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Component
public class DefaultUserFacade implements UserFacade {

    private static final Logger logger = LogManager.getLogger(DefaultUserFacade.class);

    private final FirebaseStorageService firebaseStorageService;
    private final DonationRepository donationRepository;
    private final UserService userService;
    private final DonationService donationService;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Override
    public UserModel fromDto(UserDTO source) {
        UserModel target = new UserModel();

        target.setFirstName(source.getFirstName());
        target.setLastName(source.getLastName());
        target.setBirthDate(source.getBirthDate());
        target.setTelephone(source.getTelephone());
        target.setZipCode(source.getZipCode());
        target.setEmail(source.getEmail());
        target.setAddress(source.getAddress());
        target.setPassword(source.getPassword());
        target.setIsAdmin(source.getIsAdmin());
        target.setCpf(source.getCpf());

        return target;
    }

    @Override
    public UserModel populateUserModel(UserDTO source) {
        UserModel target = new UserModel();

        target.setId(source.getId());
        target.setFirstName(source.getFirstName());
        target.setLastName(source.getLastName());
        target.setBirthDate(source.getBirthDate( ));
        target.setTelephone(source.getTelephone());
        target.setZipCode(source.getZipCode());
        target.setEmail(source.getEmail());
        target.setAddress(source.getAddress());
        target.setPassword(source.getPassword());
        target.setIsAdmin(source.getIsAdmin());
        target.setDonations(donationService.getDonationById(source.getId()));
        target.setProfilePictureUrl(source.getProfilePicture());

        return userService.updateUser(target);
    }

    @Override
    public UserResponseDTO populateUserResponseDTO(UserModel source) {
        if (source == null) {
            return null;
        }

        UserResponseDTO target = new UserResponseDTO();

        target.setId(source.getId());
        target.setTelephone(source.getTelephone());
        target.setFirstName(source.getFirstName());
        target.setLastName(source.getLastName());
        target.setAddress(source.getAddress());
        target.setEmail(source.getEmail());
        target.setZipCode(source.getZipCode());
        target.setIsAdmin(source.getIsAdmin());
        target.setProfilePictureUrl(source.getProfilePictureUrl());

        return target;
    }

    @Override
    public void deleteUser(Long id) {
        Long loggedInUserId = getLoggedInUserId();
        if (loggedInUserId.equals(id)) {
            throw new IllegalStateException("Um administrador não pode remover a si mesmo.");
        }

        if (!donationRepository.findByDonatorId(id).isEmpty()) {
            throw new IllegalStateException("Não é possível remover um usuário que possui doações registradas.");
        }

        UserModel userToDelete = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

        if (Boolean.TRUE.equals(userToDelete.getIsAdmin())) {
            long adminCount = userRepository.countByIsAdmin(true);
            if (adminCount <= 1) {
                throw new IllegalStateException("Não é possível remover o único administrador do sistema.");
            }
        }

        userService.deleteUser(id);
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
    public UserResponseDTO getUserById(Long id) {
        List<UserModel> users = userService.getUserById(id);
        if (users.isEmpty()) throw new RuntimeException("User not found");
        return populateUserResponseDTO(users.get(0));
    }

    @Override
    public UserResponseDTO updateUserProfile(Long userId, UserUpdateDTO dto) {
        List<UserModel> users = userService.getUserById(userId);
        if (users.isEmpty()) throw new RuntimeException("Usuário não encontrado");

        UserModel user = users.get(0);

        if (dto.getFirstName() != null) user.setFirstName(dto.getFirstName());
        if (dto.getLastName() != null) user.setLastName(dto.getLastName());
        if (dto.getTelephone() != null) user.setTelephone(dto.getTelephone());
        if (dto.getZipCode() != null) user.setZipCode(dto.getZipCode());
        if (dto.getAddress() != null) user.setAddress(dto.getAddress());
        if (dto.getProfilePicture() != null) user.setProfilePictureUrl(dto.getProfilePicture());

        UserModel updated = userService.updateUser(user);

        logger.info("UserID: " + userId);
        logger.info("DTO: " + dto);

        return populateUserResponseDTO(updated);
    }

    @Override
    public UserResponseDTO updateUserRole(Long id) {
        Long loggedInUserId = getLoggedInUserId();
        if (loggedInUserId.equals(id)) {
            throw new IllegalStateException("Um administrador não pode alterar o próprio cargo.");
        }

        UserModel userToUpdate = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

        if (Boolean.TRUE.equals(userToUpdate.getIsAdmin())) {
            long adminCount = userRepository.countByIsAdmin(true);
            if (adminCount <= 1) {
                throw new IllegalStateException("Não é possível alterar o cargo do único administrador.");
            }
        }

        boolean currentIsAdmin = Boolean.TRUE.equals(userToUpdate.getIsAdmin());
        userService.updateUserRole(id, !currentIsAdmin);

        UserModel updatedUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Erro ao buscar usuário após atualização."));

        return populateUserResponseDTO(updatedUser);
    }

    private Long getLoggedInUserId() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserToken) {
            return ((UserToken) principal).getId();
        }
        return -1L;
    }

    @Override
    public UserResponseDTO updateProfilePicture(Long userId, MultipartFile file) {
        try {
            List<?> rawUser = userService.getUserById(userId);
            UserModel user;
            if (rawUser != null && !rawUser.isEmpty()) {
                user = (UserModel) rawUser.get(0);
            } else if (rawUser instanceof UserModel) {
                user = (UserModel) rawUser;
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado");
            }

            String imageUrl = firebaseStorageService.uploadImage(file);

            user.setProfilePictureUrl(imageUrl);
            UserModel updatedUser = userService.updateProfilePicture(user.getId(), imageUrl);

            return modelMapper.map(updatedUser, UserResponseDTO.class);
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Falha ao fazer upload da imagem de perfil", e);
        }
    }

    private boolean checkIfUserCpfExists(String cpf) {
        return userService.existsByCPF(cpf);
    }

    private boolean checkIfUserEmailExists(String email){
        return userService.existsByEmail(email);
    }
}