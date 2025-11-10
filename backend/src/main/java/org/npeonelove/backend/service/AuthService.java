package org.npeonelove.backend.service;

import lombok.RequiredArgsConstructor;
import org.apache.tomcat.websocket.AuthenticationException;
import org.modelmapper.ModelMapper;
import org.npeonelove.backend.dto.jwt.JwtAuthenticationDTO;
import org.npeonelove.backend.dto.jwt.RefreshTokenDTO;
import org.npeonelove.backend.dto.user.TokenExchangeRequestDTO;
import org.npeonelove.backend.model.User;
import org.npeonelove.backend.repository.UserRepository;
import org.npeonelove.backend.security.SecurityService;
import org.npeonelove.backend.security.jwt.JwtService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthService {

    private final UserRepository userRepository;
    private final UserService userService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;


    // регистрация пользователя
    @Transactional
    public JwtAuthenticationDTO authentication(TokenExchangeRequestDTO tokenExchangeRequestDTO) {

        

        return jwtService.generateAuthToken(user.getUserId());
    }

    // генерация access токена по refresh токену
    public JwtAuthenticationDTO refreshAccessToken(RefreshTokenDTO refreshTokenDTO) throws AuthenticationException {

        String refreshToken = refreshTokenDTO.getRefreshToken();

        if (refreshToken != null && jwtService.validateJwtToken(refreshToken)) {
            User user = userService.getUserById(Long.parseLong(jwtService.getUserIdFromJwtToken(refreshToken)));
            return jwtService.refreshAccessToken(user.getUserId(), refreshToken);
        }

        throw new AuthenticationException("Invalid refresh token");
    }

}
