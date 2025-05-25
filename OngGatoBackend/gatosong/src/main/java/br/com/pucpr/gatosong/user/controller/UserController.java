package br.com.pucpr.gatosong.user.controller;

import br.com.pucpr.gatosong.user.dto.LoginRequest;
import br.com.pucpr.gatosong.user.dto.LoginResponse;
import br.com.pucpr.gatosong.user.dto.UserDTO;
import br.com.pucpr.gatosong.user.model.UserModel;
import br.com.pucpr.gatosong.user.service.UserService;
import br.com.pucpr.gatosong.user.service.impl.DefaultUserService;
import br.com.pucpr.gatosong.user.dto.UserResponseDTO;
import br.com.pucpr.gatosong.user.facade.UserFacade;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.annotation.security.PermitAll;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@Setter
@Getter
@RestController
@RequestMapping(value={"/user"})
@NoArgsConstructor
public class UserController {

    private static final Logger logger = LogManager.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private UserFacade userFacade;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<?> getUsers() {
        try {

            List<UserResponseDTO> userModelList = this.userFacade.getAllUsers();

            if (CollectionUtils.isEmpty(userModelList)) {
                return ResponseEntity.ok().body("No users found");
            }

            return ResponseEntity.ok().body(userModelList);

        } catch (Exception e) {
            logger.error("Unable to get users", e);
            throw new RuntimeException(e);
        }
    }

    @SecurityRequirement(name = "AuthServer")
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        try {

            List<UserResponseDTO> userModelList = userFacade.getUserById(id);

            if (CollectionUtils.isEmpty(userModelList)) {
                return ResponseEntity.ok().body("No user with code: " + id + "found");
            }

            return ResponseEntity.ok().body(userModelList);

        } catch (Exception e) {
            logger.error("Unable to get user", e);
            throw new RuntimeException(e);
        }
    }

    @PermitAll
    @PostMapping("/create")
    public ResponseEntity<?> createUser(@RequestBody UserModel userModel) {
        try {

            List<UserResponseDTO> userModelList = userFacade.createUser(userModel);

            if (CollectionUtils.isEmpty(userModelList)) {
                return ResponseEntity.ok().body("No user with code: " + userModel.getId() + " found");
            }

            return ResponseEntity.ok().body(userModelList);

        } catch (Exception e) {
            logger.error("Unable to get use", e);
            return ResponseEntity.badRequest().body("No users found");
        }
    }

    @SecurityRequirement(name = "AuthServer")
    @PatchMapping
    public ResponseEntity<?> updateUser(@RequestBody UserDTO updateModel) {
        try {
            if (!Objects.isNull(updateModel)) {
                UserModel model = userFacade.populateUserModel(updateModel);

                return ResponseEntity.ok().body(Objects.requireNonNullElseGet(model, () -> "No user with code: " + updateModel.getId() + " found"));
            }
        } catch (Exception e) {
            logger.error("Unable to get user", e);
            throw new RuntimeException(e);
        }
        return null;
    }

    @SecurityRequirement(name = "AuthServer")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {

            UserModel model = userFacade.deleteUser(id);

            if (Objects.isNull(model)){
                return ResponseEntity.ok().body("No user with code: " + id + "found");
            }

            return ResponseEntity.ok().body("Model with code: "+ id + " deleted successfully");

        } catch (Exception e) {
            logger.error("Unable to get user", e);
            throw new RuntimeException(e);
        }
    }

    @PermitAll
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            LoginResponse response = userService.login(loginRequest.email(), loginRequest.password());
            return ResponseEntity.ok().body(response);

        } catch (Exception e) {
            throw new RuntimeException("Login incorreto", e);
        }
    }

    @PermitAll
    @GetMapping("/validateEmail/{email}")
    public Boolean validateEmail(@PathVariable String email) {
        return userService.existsByEmail(email);
    }

    @PermitAll
    @GetMapping("/validateCpf/{cpf}")
    public Boolean validateCPF(@PathVariable String cpf) {
        return userService.existsByCPF(cpf);
    }
}
