package br.com.pucpr.gatosong.donation.facade.impl;

import br.com.pucpr.gatosong.donation.dto.DonationDTO;
import br.com.pucpr.gatosong.donation.facade.DonationFacade;
import br.com.pucpr.gatosong.donation.model.DonationModel;
import br.com.pucpr.gatosong.donation.service.DonationService;
import br.com.pucpr.gatosong.donation.dto.DonationResponseDTO;
import br.com.pucpr.gatosong.user.facade.UserFacade;
import br.com.pucpr.gatosong.user.model.UserModel;
import br.com.pucpr.gatosong.user.service.UserService;
import br.com.pucpr.gatosong.typeDonation.dto.TypeDonationDTO;
import br.com.pucpr.gatosong.typeDonation.facade.TypeDonationFacade;
import br.com.pucpr.gatosong.typeDonation.model.TypeDonationModel;
import br.com.pucpr.gatosong.typeDonation.service.TypeDonationService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
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
    private final TypeDonationFacade typeDonationFacade;
    private final DonationService donationService;
    private final UserService userService;
    private final TypeDonationService typeDonationService;

    @Override
    public DonationModel populateDonationModel(DonationDTO source) {

        DonationModel target = new DonationModel();

        target.setId(source.getId());
        target.setAmount(source.getAmount( ));
        target.setDate(source.getDate());


        UserModel userModel = userService.getUserById(source.getDonator()).get(0);

        if (!Objects.isNull(userModel)){
            target.setDonator(userModel);
        }

        TypeDonationModel typeDonationModel = typeDonationService.getTypeDonationById(source.getType()).get(0);
        if (!Objects.isNull(typeDonationModel))
        {
            target.setType(typeDonationModel);
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

        TypeDonationDTO donationDTO = new TypeDonationDTO();

        donationDTO.setId(source.getType().getId());
        donationDTO.setName(source.getType().getName());

        target.setType(donationDTO);
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
    public DonationResponseDTO updateDonation(DonationDTO donation) {
        DonationModel donationModel = populateDonationModel(donation);
        try {
            donationService.updateDonation(donationModel);
            return populateResponseDTO(donationModel);
        }catch (Exception e){
            throw new RuntimeException("Unable to update model");
        }
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
