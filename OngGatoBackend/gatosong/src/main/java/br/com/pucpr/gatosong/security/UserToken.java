package br.com.pucpr.gatosong.security;

import br.com.pucpr.gatosong.user.model.UserModel;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonProperty;


public class UserToken implements Serializable {

    @JsonProperty("id")
    private Long id;
    @JsonProperty("name")
    private String name;
    @JsonProperty("isAdmin")
    private Boolean isAdmin;

    public UserToken() {
        this.id=0L;
        this.name="";
    }

    public UserToken(UserModel user) {
        this.id = user.getId();
        this.name = user.getName();
        this.isAdmin = user.getIsAdmin();
    }

    public UserToken(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public  Long getId() {
        return id;
    }

    public Boolean getIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(Boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    public String getName() {
        return name;
    }
}
