package br.com.pucpr.gatosong.controller;

import br.com.pucpr.gatosong.dto.UserDTO;
import br.com.pucpr.gatosong.facade.impl.DefaultUserFacade;
import br.com.pucpr.gatosong.model.UserModel;
import br.com.pucpr.gatosong.service.impl.DefaultUserService;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    private DefaultUserService userService;

    @Autowired
    private DefaultUserFacade userFacade;

    @GetMapping
    public ResponseEntity<?> getUsers() {
        try {

            List<UserModel> userModelList = this.userService.getAllUsers();

            if (CollectionUtils.isEmpty(userModelList)) {
                return ResponseEntity.ok().body("No users found");
            }

            return ResponseEntity.ok().body(userModelList);

        } catch (Exception e) {
            logger.error("Unable to get users", e);
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        try {

            List<UserModel> userModelList = userService.getUserById(id);

            if (CollectionUtils.isEmpty(userModelList)) {
                return ResponseEntity.ok().body("No user with code: " + id + "found");
            }

            return ResponseEntity.ok().body(userModelList);

        } catch (Exception e) {
            logger.error("Unable to get user", e);
            throw new RuntimeException(e);
        }
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody UserModel userModel) {
        try {

            List<UserModel> userModelList = userService.createUser(userModel);

            if (!CollectionUtils.isEmpty(userModelList)) {
                return ResponseEntity.ok().body("No user with code: " + userModel.getId() + "found");
            }

            return ResponseEntity.ok().body(userModelList);

        } catch (Exception e) {
            logger.error("Unable to get Donation", e);
            throw new RuntimeException(e);
        }
    }

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

}
