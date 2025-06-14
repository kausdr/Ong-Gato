package br.com.pucpr.gatosong.donation.controller;

import br.com.pucpr.gatosong.donation.dto.DonationDTO;
import br.com.pucpr.gatosong.donation.dto.DonationResponseDTO;
import br.com.pucpr.gatosong.donation.facade.DonationFacade;
import br.com.pucpr.gatosong.donation.model.DonationModel;
import br.com.pucpr.gatosong.donation.service.DonationService;
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
@RequestMapping(value={"/donation"})
@NoArgsConstructor
public class DonationController {

    private static final Logger logger = LogManager.getLogger(DonationController.class);

    @Autowired
    private DonationService donationService;

    @Autowired
    private DonationFacade donationFacade;

    @SecurityRequirement(name="AuthServer")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping
    public ResponseEntity<List<DonationResponseDTO>> getDonations() {
        try {
            List<DonationResponseDTO> donationList = donationFacade.getAllDonations();

            return ResponseEntity.ok(donationList);
        } catch (Exception e) {
            logger.error("Unable to get Donations", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @SecurityRequirement(name = "AuthServer")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<List<DonationResponseDTO>> getDonationById(@PathVariable Long id) {
        try {
            List<DonationResponseDTO> responseDTOS = donationFacade.getDonationById(id);

            return ResponseEntity.ok(responseDTOS);
        } catch (Exception e) {
            logger.error("Unable to get Donation", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @SecurityRequirement(name = "AuthServer")
    @PostMapping
    public ResponseEntity<?> createDonation(@RequestBody DonationDTO donation) {
        try {

            DonationResponseDTO responseDTO = donationFacade.createDonation(donation);

            if (Objects.isNull(responseDTO)) {
                return ResponseEntity.ok().body("No donation created");
            }

            return ResponseEntity.ok().body(responseDTO);

        } catch (Exception e) {
            logger.error("Unable to create Donation", e);
            throw new RuntimeException(e);
        }
    }

    @SecurityRequirement(name = "AuthServer")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PatchMapping("/{id}")
    public ResponseEntity<?> updateDonation(@PathVariable Long id, @RequestBody DonationDTO updateModel) {
        try {
            DonationResponseDTO responseDTO = donationFacade.updateDonation(id, updateModel);

            return ResponseEntity.ok(responseDTO);
        } catch (Exception e) {
            logger.error("Unable to update Donation", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @SecurityRequirement(name = "AuthServer")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDonation(@PathVariable Long id) {
        try {

            DonationModel model = donationFacade.deleteDonation(id);

            if (Objects.isNull(model)){
                return ResponseEntity.ok().body("No donation with code: " + id + "found");
            }

            return ResponseEntity.ok().body("Model with code: "+ id + " deleted successfully");

        } catch (Exception e) {
            logger.error("Unable to delete Donation", e);
            throw new RuntimeException(e);
        }
    }

}
