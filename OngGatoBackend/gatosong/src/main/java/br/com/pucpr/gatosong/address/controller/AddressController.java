package br.com.pucpr.gatosong.address.controller;

import br.com.pucpr.gatosong.address.dto.ViaCepResponseDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/address")
public class AddressController {

    @GetMapping("/cep/{cep}")
    public ResponseEntity<ViaCepResponseDTO> getAddressByCep(@PathVariable String cep) {

        String sanitizedCep = cep.replaceAll("[^0-9]", "");

        if (sanitizedCep.length() != 8) {
            return ResponseEntity.badRequest().build();
        }

        String viaCepUrl = "https://viacep.com.br/ws/" + sanitizedCep + "/json/";
        RestTemplate restTemplate = new RestTemplate();

        try {
            ViaCepResponseDTO viaCepResponse = restTemplate.getForObject(viaCepUrl, ViaCepResponseDTO.class);

            if (viaCepResponse != null && viaCepResponse.isErro()) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok(viaCepResponse);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}