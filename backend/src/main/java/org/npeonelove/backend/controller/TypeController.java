package org.npeonelove.backend.controller;

import lombok.RequiredArgsConstructor;
import org.npeonelove.backend.service.TypeService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/types")
@RequiredArgsConstructor
public class TypeController {

    private final TypeService typeService;

}
