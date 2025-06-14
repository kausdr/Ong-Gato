package br.com.pucpr.gatosong.user.model;

import br.com.pucpr.gatosong.donation.model.DonationModel;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.time.LocalDate;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "users")
public class UserModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "code", unique = true, nullable = false)
    @JsonProperty("id")
    private Long id;

    @JsonProperty("first_name")
    @Column(name = "first_name")
    private String firstName;

    @JsonProperty("last_name")
    @Column(name = "last_name")
    private String lastName;

    @JsonProperty("isAdmin")
    @Column(name = "isAdmin")
    private Boolean isAdmin;

    @Column(name = "birthDate")
    private LocalDate birthDate;

    @Column(name = "telephone")
    private String telephone;

    @Column(name = "zipCode")
    private String zipCode;

    @Column(name = "email")
    private String email;

    @Column(name = "address")
    private String address;

    @JsonIgnore
    @Column(name = "password")
    private String password;

    @Column(name = "cpf", nullable = false, unique = true)
    private String cpf;

    @Column(name = "profile_picture_url", length = 512)
    private String profilePictureUrl;

    @OneToMany(mappedBy = "donator", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<DonationModel> donations = new ArrayList<>();
}