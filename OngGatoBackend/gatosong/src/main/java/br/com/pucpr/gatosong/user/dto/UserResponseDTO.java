package br.com.pucpr.gatosong.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserResponseDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String telephone;
    private String email;
    private String address;
    private String zipCode;
    private Boolean isAdmin;
    private String profilePicture;
}