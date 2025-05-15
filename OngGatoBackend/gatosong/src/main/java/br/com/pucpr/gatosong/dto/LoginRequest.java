package br.com.pucpr.gatosong.dto;

public record LoginRequest(
        String email,
        String password
) {

}
