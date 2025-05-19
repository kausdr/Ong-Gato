package br.com.pucpr.gatosong.user.dto;

public record LoginResponse(
        String troken,
        UserResponse user
) {
}
