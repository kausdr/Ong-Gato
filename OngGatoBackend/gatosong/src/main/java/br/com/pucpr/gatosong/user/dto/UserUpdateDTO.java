package br.com.pucpr.gatosong.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserUpdateDTO {
    private String firstName;
    private String lastName;
    private String telephone;
    private String zipCode;
    private String address;
    private String profilePicture;
}