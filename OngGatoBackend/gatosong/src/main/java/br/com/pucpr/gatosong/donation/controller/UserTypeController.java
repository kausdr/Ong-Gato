package br.com.pucpr.gatosong.donation.controller;

import br.com.pucpr.gatosong.donation.dto.UserTypeDTO;
import br.com.pucpr.gatosong.donation.model.UserTypeModel;
import br.com.pucpr.gatosong.donation.facade.impl.DefaultUserTypeFacade;
import br.com.pucpr.gatosong.donation.service.impl.DefaultUserTypeService;
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
@RequestMapping(value={"/userType"})
@NoArgsConstructor
public class UserTypeController {

    private static final Logger logger = LogManager.getLogger(UserTypeController.class);

    @Autowired
    private DefaultUserTypeService userTypeService;

    @Autowired
    private DefaultUserTypeFacade userTypeFacade;

    @GetMapping
    public ResponseEntity<?> getUsers() {
        try {

            List<UserTypeModel> userTypeModelList = this.userTypeService.getAllUserTypes();

            if (CollectionUtils.isEmpty(userTypeModelList)) {
                return ResponseEntity.ok().body("No user types found");
            }

            return ResponseEntity.ok().body(userTypeModelList);

        } catch (Exception e) {
            logger.error("Unable to get user types", e);
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserTypeById(@PathVariable Long id) {
        try {

            List<UserTypeModel> userTypeModelList = userTypeService.getUserTypeById(id);

            if (CollectionUtils.isEmpty(userTypeModelList)) {
                return ResponseEntity.ok().body("No user type with code: " + id + "found");
            }

            return ResponseEntity.ok().body(userTypeModelList);

        } catch (Exception e) {
            logger.error("Unable to get user type", e);
            throw new RuntimeException(e);
        }
    }

    @PostMapping
    public ResponseEntity<?> createUserType(@RequestBody UserTypeModel userTypeModel) {
        try {

            List<UserTypeModel> userTypeModelList = userTypeService.createUserType(userTypeModel);

            if (!CollectionUtils.isEmpty(userTypeModelList)) {
                return ResponseEntity.ok().body("No user type with code: " + userTypeModel.getId() + "found");
            }

            return ResponseEntity.ok().body(userTypeModelList);

        } catch (Exception e) {
            logger.error("Unable to get user type", e);
            throw new RuntimeException(e);
        }
    }

    @PatchMapping
    public ResponseEntity<?> updateUserType(@RequestBody UserTypeDTO updateModel) {
        try {
            if (!Objects.isNull(updateModel)) {
                UserTypeModel model = userTypeFacade.populateUserTypeModel(updateModel);

                return ResponseEntity.ok().body(Objects.requireNonNullElseGet(model, () -> "No user type with code: " + updateModel.getId() + " found"));
            }
        } catch (Exception e) {
            logger.error("Unable to get user type", e);
            throw new RuntimeException(e);
        }
        return null;
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUserType(@PathVariable Long id) {
        try {

            UserTypeModel model = userTypeFacade.deleteUserType(id);

            if (Objects.isNull(model)){
                return ResponseEntity.ok().body("No user type with code: " + id + "found");
            }

            return ResponseEntity.ok().body("Model with code: "+ id + " deleted successfully");

        } catch (Exception e) {
            logger.error("Unable to get user type", e);
            throw new RuntimeException(e);
        }
    }

}
