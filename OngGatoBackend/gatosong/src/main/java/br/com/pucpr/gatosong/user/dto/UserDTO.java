package br.com.pucpr.gatosong.user.dto;

import java.time.LocalDate;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private LocalDate birthDate;
    private String telephone;
    private String zipCode;
    private String email;
    private String address;
    private String password;
    private boolean isAdmin;
    private String cpf;
    private String profilePicture;

    public boolean getIsAdmin() {
        return this.isAdmin;
    }
}