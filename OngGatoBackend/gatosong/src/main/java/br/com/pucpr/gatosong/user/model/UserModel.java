package br.com.pucpr.gatosong.user.model;

import br.com.pucpr.gatosong.donation.model.DonationModel;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.time.LocalDate;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class UserModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "code", unique = true, nullable = false)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "is_admin")
    private boolean isAdmin;

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

    @Column(name = "cpf", nullable = true)
    private String cpf;

    @OneToMany(mappedBy = "donator", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<DonationModel> donations = new ArrayList<>();

    public UserModel() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean getIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<DonationModel> getDonations() {
        return donations;
    }

    public void setDonations(List<DonationModel> donations) {
        this.donations = donations;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }
}