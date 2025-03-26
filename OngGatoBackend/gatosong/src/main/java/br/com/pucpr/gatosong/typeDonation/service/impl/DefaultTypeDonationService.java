package br.com.pucpr.gatosong.typeDonation.service.impl;

import br.com.pucpr.gatosong.typeDonation.model.TypeDonationModel;
import br.com.pucpr.gatosong.typeDonation.repository.TypeDonationRepository;
import br.com.pucpr.gatosong.typeDonation.service.TypeDonationService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@NoArgsConstructor
public class DefaultTypeDonationService implements TypeDonationService {

    private static final Logger logger = LogManager.getLogger(DefaultTypeDonationService.class);

    private TypeDonationRepository typeDonationRepository;


    @Override
    public List<TypeDonationModel> getAllTypeDonations() {

        List<TypeDonationModel> list = typeDonationRepository.findAll();

        if (list.isEmpty()) {
            return null;
        }

        return list;
    }

    @Override
    public List<TypeDonationModel> getTypeDonationById(Long id) {
        Optional<TypeDonationModel> typeDonationModel = typeDonationRepository.findById(id);

        return typeDonationModel.map(Collections::singletonList).orElse(null);
    }

    @Override
    public List<TypeDonationModel> createTypeDonation(TypeDonationModel typeDonationModel) {

        TypeDonationModel model = null;

        if (!ObjectUtils.isEmpty(typeDonationModel)) {
            try {
                model = typeDonationRepository.save(typeDonationModel);
            } catch (Exception e) {
                logger.error("Unable to save TypeDonationModel", e);
            }
        }

        return ObjectUtils.isEmpty(model) ? null : Collections.singletonList(model);
    }

    @Override
    public TypeDonationModel updateTypeDonation(TypeDonationModel typeDonationModel) {

        TypeDonationModel model = null;

        if (!ObjectUtils.isEmpty(typeDonationModel) && typeDonationRepository.existsById(typeDonationModel.getId())) {
            try {
                model = typeDonationRepository.save(typeDonationModel);
            } catch (Exception e) {
                logger.error("Unable to save TypeDonationModel", e);
            }
        }

        return ObjectUtils.isEmpty(model) ? null : model;
    }

    @Override
    public void deleteTypeDonationModel(Long id) {
        if (typeDonationRepository.existsById(id)) {
            try {
                typeDonationRepository.deleteById(id);
            } catch (Exception e) {
                logger.error("Unable to delete TypeDonationModel", e);
            }
        }
    }
}
