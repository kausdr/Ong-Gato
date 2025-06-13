package br.com.pucpr.gatosong.user.dto;

public record LoginRequest(
        String email,
        String password
) { }