package org.npeonelove.backend.dto.jwt;

import lombok.Data;

@Data
public class JwtAuthenticationDTO {

    private String accessToken;
    private String refreshToken;

}
