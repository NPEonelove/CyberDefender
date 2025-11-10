package org.npeonelove.backend.exception.auth;

public class TokenExchangeException extends RuntimeException {
    public TokenExchangeException(String message) {
        super(message);
    }
}
