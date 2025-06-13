package br.com.pucpr.gatosong.typeDonation.facade.impl;

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
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Component
public class DefaultTypeDonationFacade implements TypeDonationFacade {

    private static final Logger logger = LogManager.getLogger(DefaultTypeDonationFacade.class);

    private final TypeDonationService typeDonationService;

    @Override
    public TypeDonationModel populateTypeDonationModel(TypeDonationDTO source) {
        TypeDonationModel target = new TypeDonationModel();

        target.setId(source.getId());
        target.setName(source.getName());

        return typeDonationService.updateTypeDonation(target);
    }

    @Override
    public TypeDonationModel deleteTypeDonation(Long id) {
        List<TypeDonationModel> model = typeDonationService.getTypeDonationById(id);

        if (model.isEmpty()) {
            logger.error("TypeDonationModel not found");
            return null;
        }

        typeDonationService.deleteTypeDonationModel(id);

        return model.get(0);
    }
}
