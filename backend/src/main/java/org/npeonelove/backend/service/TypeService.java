package org.npeonelove.backend.service;

import lombok.RequiredArgsConstructor;
import org.npeonelove.backend.repository.TypeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TypeService {

    private final TypeRepository typeRepository;

}
