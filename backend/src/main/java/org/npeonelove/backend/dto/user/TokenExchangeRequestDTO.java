package org.npeonelove.backend.dto.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TokenExchangeRequestDTO {

    @NotBlank(message = "Enter the token (encrypted string)")
    @Size(message = "Token should be smaller than 1024 symbols")
    private String token;

}
