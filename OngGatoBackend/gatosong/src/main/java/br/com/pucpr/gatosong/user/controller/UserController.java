package br.com.pucpr.gatosong.user.controller;

import br.com.pucpr.gatosong.security.UserToken;
import br.com.pucpr.gatosong.user.dto.*;
import br.com.pucpr.gatosong.user.model.UserModel;
import br.com.pucpr.gatosong.user.service.UserService;
import br.com.pucpr.gatosong.user.facade.UserFacade;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.annotation.security.PermitAll;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.AuthenticationException;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

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

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        try {
            UserResponseDTO user = (UserResponseDTO) userFacade.getUserById(id);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No user with code: " + id + " found");
            }

            return ResponseEntity.ok(user);
        } catch (Exception e) {
            logger.error("Unable to get user", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving user");
        }
    }

    @SecurityRequirement(name = "AuthServer")
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal UserToken userToken) {
        if (userToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não autenticado");
        }

        try {
            UserResponseDTO user = userFacade.getUserById(userToken.getId());
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao obter o usuário logado");
        }
    }

    @SecurityRequirement(name = "AuthServer")
    @PutMapping("/me")
    public ResponseEntity<?> updateCurrentUser(
            @AuthenticationPrincipal UserToken userToken,
            @RequestBody UserUpdateDTO userUpdateDTO) {
        if (userToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não autenticado");
        }

        try {
            UserResponseDTO updatedUser = userFacade.updateUserProfile(userToken.getId(), userUpdateDTO);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            logger.error("Erro ao atualizar perfil do usuário", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao atualizar perfil");
        }
    }

    @PermitAll
    @PostMapping("/create")
    public ResponseEntity<?> createUser(@RequestBody UserDTO userDTO) {
        try {

            UserModel userModel = userFacade.fromDto(userDTO);

            List<UserResponseDTO> createdUsers = userFacade.createUser(userModel);

            return ResponseEntity.ok().body(createdUsers);
        } catch (Exception e) {
            logger.error("Unable to create user", e);
            return ResponseEntity.badRequest().body("Erro ao o criar usuário: " + e.getMessage());
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody UserDTO updateModel) {
        try {
            if (updateModel != null) {
                updateModel.setId(id);
                UserModel model = userFacade.populateUserModel(updateModel);

                return ResponseEntity.ok().body(
                        Objects.requireNonNullElseGet(model, () -> "No user with code: " + id + " found")
                );
            }
        } catch (Exception e) {
            logger.error("Unable to update user", e);
            throw new RuntimeException(e);
        }
        return ResponseEntity.badRequest().body("Dados de atualização inválidos");
    }

    @PreAuthorize("hasRole('ADMIN')")
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
            return ResponseEntity.ok(response);
        } catch (AuthenticationException e) {
            logger.warn("Login failed for email {}", loginRequest.email());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas");
        } catch (Exception e) {
            logger.error("Login error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro interno no login");
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