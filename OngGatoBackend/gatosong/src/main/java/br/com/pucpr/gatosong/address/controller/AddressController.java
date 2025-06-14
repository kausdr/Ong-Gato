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

        String viaCepUrl = "https://viacep.com.br/ws/" + sanitizedCep + "/json/";

        RestTemplate restTemplate = new RestTemplate();
        try {
            ResponseEntity<ViaCepResponseDTO> response = restTemplate.getForEntity(viaCepUrl, ViaCepResponseDTO.class);

            return ResponseEntity.ok(response.getBody());
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}