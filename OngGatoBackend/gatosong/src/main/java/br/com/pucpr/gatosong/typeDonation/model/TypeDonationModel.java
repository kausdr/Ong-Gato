package br.com.pucpr.gatosong.typeDonation.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
public class TypeDonationModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "code", unique = true, nullable = false)
    private Long id;

    @Column(name = "name")
    private String name;

    public TypeDonationModel() {
    }
}
