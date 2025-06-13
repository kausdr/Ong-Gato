package br.com.pucpr.gatosong.typeDonation.controller;

import br.com.pucpr.gatosong.typeDonation.dto.TypeDonationDTO;
import br.com.pucpr.gatosong.typeDonation.facade.impl.DefaultTypeDonationFacade;
import br.com.pucpr.gatosong.typeDonation.model.TypeDonationModel;
import br.com.pucpr.gatosong.typeDonation.service.impl.DefaultTypeDonationService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Objects;

@Setter
@Getter
@RestController
@RequestMapping(value={"/type-donation"})
@NoArgsConstructor
public class TypeDonationController {

    private static final Logger logger = LogManager.getLogger(TypeDonationController.class);

    @Autowired
    private DefaultTypeDonationService typeDonationService;

    @Autowired
    private DefaultTypeDonationFacade typeDonationFacade;

    @SecurityRequirement(name="AuthServer")
    @GetMapping
    public ResponseEntity<?> getTypeDonations() {
        try {

            List<TypeDonationModel> modelList = typeDonationService.getAllTypeDonations();

            if (CollectionUtils.isEmpty(modelList)) {
                return ResponseEntity.ok().body("No type donations found");
            }

            return ResponseEntity.ok().body(modelList);

        } catch (Exception e) {
            logger.error("Unable to get Types", e);
            return ResponseEntity.badRequest().body("Unable to find types");
        }
    }

    @SecurityRequirement(name = "AuthServer")
    @GetMapping("/{id}")
    public ResponseEntity<?> getTypeDonationById(@PathVariable Long id) {
        try {

            List<TypeDonationModel> modelList = typeDonationService.getTypeDonationById(id);

            if (CollectionUtils.isEmpty(modelList)) {
                return ResponseEntity.ok().body("No type donation with code: " + id + " found");
            }

            return ResponseEntity.ok().body(modelList);

        } catch (Exception e) {
            logger.error("Unable to get Type", e);
            return ResponseEntity.badRequest().body("Unable to find type");
        }
    }

    @SecurityRequirement(name = "AuthServer")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<?> createTypeDonation(@RequestBody TypeDonationModel donationModel) {
        try {

            List<TypeDonationModel> modelList = typeDonationService.createTypeDonation(donationModel);

            if (CollectionUtils.isEmpty(modelList)) {
                return ResponseEntity.ok().body("No type donation with code: " + donationModel.getId() + "found");
            }

            return ResponseEntity.ok().body(modelList);

        } catch (Exception e) {
            logger.error("Unable to create Type Donation", e);
            return ResponseEntity.badRequest().body("Unable to create type");
        }
    }

    @SecurityRequirement(name = "AuthServer")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PatchMapping("/{id}")
    public ResponseEntity<?> updateTypeDonation(@RequestBody TypeDonationDTO updateModel) {
        try {
            if (!Objects.isNull(updateModel)) {
                TypeDonationModel model = typeDonationFacade.populateTypeDonationModel(updateModel);

                return ResponseEntity.ok().body(Objects.requireNonNullElseGet(model, () -> "No type donation with code: " + updateModel.getId() + "found"));
            }
        } catch (Exception e) {
            logger.error("Unable to update Type", e);
            return ResponseEntity.badRequest().body("Unable to update type");
        }
        return null;
    }


    @ResponseStatus(HttpStatus.NO_CONTENT)
    @SecurityRequirement(name = "AuthServer")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTypeDonation(@PathVariable Long id) {
        try {

            TypeDonationModel model = typeDonationFacade.deleteTypeDonation(id);

            if (Objects.isNull(model)){
                return ResponseEntity.ok().body("No type donation with code: " + id + "found");
            }

            return ResponseEntity.ok().body("Model with code: "+ id + " deleted successfully");

        } catch (Exception e) {
            logger.error("Unable to delete Type", e);
            return ResponseEntity.badRequest().body("Unable to delete type");
        }
    }

}
