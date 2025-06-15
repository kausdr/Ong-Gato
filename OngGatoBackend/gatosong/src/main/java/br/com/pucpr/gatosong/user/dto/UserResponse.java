package br.com.pucpr.gatosong.user.dto;

import br.com.pucpr.gatosong.user.model.UserModel;

public record UserResponse(
        Long id,
        String firstName,
        String lastName,
        String email,
        boolean isAdmin,
        String profilePicture
) {
    public UserResponse(UserModel user) {
        this(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getIsAdmin(),
                user.getProfilePictureUrl() != null && !user.getProfilePictureUrl().isEmpty() ?
                        "data:image/jpeg;base64," + user.getProfilePictureUrl() : null
        );
    }
}