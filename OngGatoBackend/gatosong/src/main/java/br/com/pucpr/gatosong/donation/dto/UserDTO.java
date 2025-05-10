package br.com.pucpr.gatosong.donation.dto;

import java.math.BigDecimal;
import java.util.Date;

public class UserDTO {
    public Long id;
    public String name;
    public Date birthDate;
    public String telephone;
    public String zipCode;
    public String email;
    public String address;
    public String password;
    public Long userTypeID;

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

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
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

    public Long getUserTypeID() {
        return userTypeID;
    }

    public void setUserTypeID(Long userTypeID) {
        this.userTypeID = userTypeID;
    }
}
