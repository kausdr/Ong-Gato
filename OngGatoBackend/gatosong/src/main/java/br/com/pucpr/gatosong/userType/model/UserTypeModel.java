package br.com.pucpr.gatosong.userType.model;

import jakarta.persistence.*;

@Entity
public class UserTypeModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "code", unique = true, nullable = false)
    private Long id;

    @Column(name = "userType")
    private String userType;

    @Column(name = "description")
    private String description;

    public UserTypeModel() {
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
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
