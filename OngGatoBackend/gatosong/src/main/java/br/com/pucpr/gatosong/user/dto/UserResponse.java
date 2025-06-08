package br.com.pucpr.gatosong.user.dto;

import br.com.pucpr.gatosong.user.model.UserModel;

public record UserResponse(
        Long id,
        String name,
        String email,
        boolean isAdmin
) {
    public UserResponse(UserModel user) {
        this(user.getId(), user.getName(), user.getEmail(), user.getIsAdmin());
    }
}