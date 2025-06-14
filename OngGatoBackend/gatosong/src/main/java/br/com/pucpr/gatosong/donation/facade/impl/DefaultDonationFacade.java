package br.com.pucpr.gatosong.donation.facade.impl;

import br.com.pucpr.gatosong.donation.dto.DonationDTO;
import br.com.pucpr.gatosong.donation.facade.DonationFacade;
import br.com.pucpr.gatosong.donation.model.DonationModel;
import br.com.pucpr.gatosong.donation.model.DonationType;
import br.com.pucpr.gatosong.donation.service.DonationService;
import br.com.pucpr.gatosong.donation.dto.DonationResponseDTO;
import br.com.pucpr.gatosong.user.facade.UserFacade;
import br.com.pucpr.gatosong.user.model.UserModel;
import br.com.pucpr.gatosong.user.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@AllArgsConstructor
@Component
public class DefaultDonationFacade implements DonationFacade {

    private static final Logger logger = LogManager.getLogger(DefaultDonationFacade.class);

    private final UserFacade userFacade;
    private final DonationService donationService;
    private final UserService userService;

    @Override
    public DonationModel populateDonationModel(DonationDTO source) {

        DonationModel target = new DonationModel();

        target.setId(source.getId());
        target.setAmount(source.getAmount( ));
        target.setDate(new java.util.Date());
        target.setType(source.getType());

        UserModel userModel = userService.getUserById(source.getDonator()).get(0);

        if (!Objects.isNull(userModel)){
            target.setDonator(userModel);
        }

        return target;
    }

    @Override
    public DonationResponseDTO populateResponseDTO(DonationModel source) {

        DonationResponseDTO target = new DonationResponseDTO();

        target.setId(source.getId());
        target.setAmount(source.getAmount());
        target.setDate(source.getDate());
        target.setDonator(userFacade.populateUserResponseDTO(source.getDonator()));
        target.setType(source.getType());

        return target;
    }

    @Override
    public DonationModel deleteDonation(Long id) {
       List<DonationModel> model = donationService.getDonationById(id);

       if (model.isEmpty()) {
           logger.error("DonationModel not found");
           return null;
       }

       donationService.deleteDonationModel(id);

       return model.get(0);
    }

    @Override
    public DonationResponseDTO createDonation(DonationDTO donation) {
        DonationModel donationModel = populateDonationModel(donation);
        try {
            donationService.createDonation(donationModel);
            return populateResponseDTO(donationModel);
        }catch (Exception e){
            throw new RuntimeException("Unable to create model");
        }
    }

    @Override
    public DonationResponseDTO updateDonation(Long id, DonationDTO donation) {
        DonationModel existingDonation = donationService.getDonationById(id).stream().findFirst()
                .orElseThrow(() -> new RuntimeException("Doação não encontrada com o id: " + id));

        if (donation.getAmount() != null) {
            existingDonation.setAmount(donation.getAmount());
        }
        if (donation.getType() != null) {
            existingDonation.setType(donation.getType());
        }

        DonationModel updatedDonation = donationService.updateDonation(existingDonation);

        return populateResponseDTO(updatedDonation);
    }

    @Override
    public List<DonationResponseDTO> getAllDonations() {
        List<DonationResponseDTO> dtos = new ArrayList<>();

        try {
            List<DonationModel> models = donationService.getAllDonations();
            if (CollectionUtils.isEmpty(models)){
                return null;
            }
            for (DonationModel model : models){
                dtos.add(populateResponseDTO(model));
            }
            return dtos;
        }catch (Exception e){
            return null;
        }
    }

    @Override
    public List<DonationResponseDTO> getDonationById(Long id) {
        List<DonationResponseDTO> dtos = new ArrayList<>();

        try {
            List<DonationModel> models = donationService.getDonationById(id);
            if (CollectionUtils.isEmpty(models)){
                return null;
            }
            for (DonationModel model : models){
                dtos.add(populateResponseDTO(model));
            }
            return dtos;
        }catch (Exception e){
            return null;
        }
    }
}
