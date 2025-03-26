package br.com.pucpr.gatosong.typeDonation.controller;

import br.com.pucpr.gatosong.donation.dto.DonationDTO;
import br.com.pucpr.gatosong.typeDonation.dto.TypeDonationDTO;
import br.com.pucpr.gatosong.typeDonation.facade.impl.DefaultTypeDonationFacade;
import br.com.pucpr.gatosong.typeDonation.model.TypeDonationModel;
import br.com.pucpr.gatosong.typeDonation.service.TypeDonationService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@Setter
@Getter
@RestController
@RequestMapping(value={"/type-donation"})
@AllArgsConstructor
@NoArgsConstructor
public class TypeDonationController {

    private static final Logger logger = LogManager.getLogger(TypeDonationController.class);

    private TypeDonationService typeDonationService;
    private DefaultTypeDonationFacade typeDonationFacade;

    @GetMapping
    public ResponseEntity<?> getDonations() {
        try {

            List<TypeDonationModel> modelList = typeDonationService.getAllTypeDonations();

            if (CollectionUtils.isEmpty(modelList)) {
                return ResponseEntity.ok().body("No type donations found");
            }

            return ResponseEntity.ok().body(modelList);

        } catch (Exception e) {
            logger.error("Unable to get Types", e);
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDonationById(@PathVariable Long id) {
        try {

            List<TypeDonationModel> modelList = typeDonationService.getTypeDonationById(id);

            if (CollectionUtils.isEmpty(modelList)) {
                return ResponseEntity.ok().body("No type donation with code: " + id + "found");
            }

            return ResponseEntity.ok().body(modelList);

        } catch (Exception e) {
            logger.error("Unable to get Type", e);
            throw new RuntimeException(e);
        }
    }

    @PostMapping
    public ResponseEntity<?> createDonation(@RequestBody TypeDonationModel donationModel) {
        try {

            List<TypeDonationModel> modelList = typeDonationService.createTypeDonation(donationModel);

            if (CollectionUtils.isEmpty(modelList)) {
                return ResponseEntity.ok().body("No type donation with code: " + donationModel.getId() + "found");
            }

            return ResponseEntity.ok().body(modelList);

        } catch (Exception e) {
            logger.error("Unable to create Donation", e);
            throw new RuntimeException(e);
        }
    }

    @PatchMapping
    public ResponseEntity<?> updateDonation(@RequestBody TypeDonationDTO updateModel) {
        try {
            if (updateModel == null) {
                TypeDonationModel model = typeDonationFacade.populateTypeDonationModel(updateModel);

                return ResponseEntity.ok().body(Objects.requireNonNullElseGet(model, () -> "No type donation with code: " + updateModel.getId() + "found"));
            }
        } catch (Exception e) {
            logger.error("Unable to update Type", e);
            throw new RuntimeException(e);
        }
        return null;
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDonation(@PathVariable Long id) {
        try {

            TypeDonationModel model = typeDonationFacade.deleteTypeDonation(id);

            if (model == null){
                return ResponseEntity.ok().body("No type donation with code: " + id + "found");
            }

            return ResponseEntity.ok().body("Model with code: "+ id + " deleted successfully");

        } catch (Exception e) {
            logger.error("Unable to delete Type", e);
            throw new RuntimeException(e);
        }
    }


}
