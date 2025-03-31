package br.com.pucpr.gatosong.security;

import br.com.pucpr.gatosong.model.UserModel;

public class UserToken {
    private Long id;
    private String name;

    public UserToken() {
        this.id=0L;
        this.name="";
    }

    public UserToken(UserModel user) {
        this.id = user.getId();
        this.name = user.getName();
    }

    public UserToken(Long id, String name) {
        this.id = id;
        this.name = name;
    }

}
