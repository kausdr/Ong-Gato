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

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

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

    @Column(name = "cpf", nullable = false, unique = true)
    private String cpf;

    @Lob
    @Column(name = "profile_picture", columnDefinition = "MEDIUMTEXT")
    private String profilePicture;

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

    public String getFirstName() { return firstName; }

    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }

    public void setLastName(String lastName) { this.lastName = lastName; }

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

    public String getProfilePicture() { return profilePicture; }

    public void setProfilePicture(String profilePicture) { this.profilePicture = profilePicture; }
}