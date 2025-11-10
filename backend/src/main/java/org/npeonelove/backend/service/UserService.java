package org.npeonelove.backend.service;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.npeonelove.backend.dto.user.GetJwtUserClaimsResponseDTO;
import org.npeonelove.backend.exception.user.UserNotFoundException;
import org.npeonelove.backend.model.User;
import org.npeonelove.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    // получение айди и роли для генерации jwt токенов
    public GetJwtUserClaimsResponseDTO getJwtUserClaims(Long userId) {
        return modelMapper.map(getUserById(userId), GetJwtUserClaimsResponseDTO.class);
    }

    // получение юзера по UUID
    public User getUserById(Long userId) {
        return userRepository.findUserByUserId(userId).orElseThrow(
                () -> new UserNotFoundException("User with id " + userId.toString() + " not found"));
    }
}
