package br.com.pucpr.gatosong.donation.dto;

import java.math.BigDecimal;
import java.util.Date;

public class UserTypeDTO {
    public Long id;
    public String userType;
    public String description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
