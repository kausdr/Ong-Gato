package br.com.pucpr.gatosong.security;

import br.com.pucpr.gatosong.model.UserModel;

public class Jwt {
    public String createToken(UserModel user) {
        UserToken userToken = new UserToken(user);

        return Jwts.builder()
                .serializeToJsonWith(new JacksonSerializer<>())
                .signWith(Keys.hmacShaKeyFor(SECRET.getBytes())) // Chave secreta
                .setIssuedAt(new Date()) // Data de emissão
                .setExpiration(new Date(System.currentTimeMillis() +
                        (userToken.isAdmin() ? ADMIN_EXPIRE_HOURS : EXPIRE_HOURS) * 3600 * 1000)) // Expiração
                .setIssuer(ISSUER) // Emissor do token
                .setSubject(String.valueOf(userToken.getId())) // ID do usuário
                .claim(USER_FIELD, userToken) // Adiciona UserToken como um "claim"
                .compact();
    }

}
