package br.com.pucpr.gatosong.user.dto;

public record LoginResponse(
        String token,
        UserResponse user
) {
    public LoginResponse(String token, UserResponse user) {
        this.token = token;
        this.user = user;
    }
}
