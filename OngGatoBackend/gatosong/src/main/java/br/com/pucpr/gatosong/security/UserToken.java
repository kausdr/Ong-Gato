package br.com.pucpr.gatosong.security;

import br.com.pucpr.gatosong.user.model.UserModel;
import lombok.Getter;


public class UserToken {
    private Long id;
    private String name;
    private boolean isAdmin;

    public UserToken() {
        this.id=0L;
        this.name="";
    }

    public UserToken(UserModel user) {
        this.id = user.getId();
        this.name = user.getFirstName()+user.getLastName();
        this.isAdmin = user.getIsAdmin();
    }

    public UserToken(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public boolean isAdmin() {
        return isAdmin;
    }
}
