package org.npeonelove.backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.npeonelove.backend.dto.jwt.JwtAuthenticationDTO;
import org.npeonelove.backend.dto.user.TokenExchangeRequestDTO;
import org.npeonelove.backend.exception.auth.TokenExchangeException;
import org.npeonelove.backend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @GetMapping("/test")
    public String test() {
        return "test";
    }

    @PostMapping("/exchange")
    public ResponseEntity<JwtAuthenticationDTO> exchange(@RequestBody @Valid TokenExchangeRequestDTO tokenExchangeRequestDTO,
                                                         BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new TokenExchangeException(validateBindingResult(bindingResult));
        }

        return ResponseEntity.ok(authService.authentication(tokenExchangeRequestDTO));
    }

    // получение строки с ошибками валидации для исключений
    private String validateBindingResult(BindingResult bindingResult) {
        StringBuilder errors = new StringBuilder();
        for (FieldError error : bindingResult.getFieldErrors()) {
            errors.append(error.getDefaultMessage());
            errors.append(" ");
        }
        return errors.toString();
    }
}
