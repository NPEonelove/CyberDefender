package org.npeonelove.backend.controller;

import lombok.RequiredArgsConstructor;
import org.npeonelove.backend.dto.achievement.GetAchievementResponseDTO;
import org.npeonelove.backend.service.AchievementService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/achievements")
@RequiredArgsConstructor
public class AchievementController {

    private final AchievementService achievementService;

    @GetMapping("/{userId}/give-experience-achievements")
    public ResponseEntity<Boolean> giveExperienceAchievements(@PathVariable("userId") Long userId) {
        return ResponseEntity.ok(achievementService.checkAndAwardExperienceAchievements(userId));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<GetAchievementResponseDTO>> getAchievements(@PathVariable("userId") Long userId) {
        return ResponseEntity.ok(achievementService.getUserAchievements(userId));
    }

}
