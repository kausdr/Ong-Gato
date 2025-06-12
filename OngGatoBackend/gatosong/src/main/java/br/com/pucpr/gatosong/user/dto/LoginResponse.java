package br.com.pucpr.gatosong.user.dto;

public record LoginResponse(
        String token,
        UserResponseDTO user
) { }