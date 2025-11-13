// AchievementService.java (исправленная)
package org.npeonelove.backend.service;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.npeonelove.backend.dto.achievement.GetAchievementResponseDTO;
import org.npeonelove.backend.model.achievement.Achievement;
import org.npeonelove.backend.model.achievement.UserAchievement;
import org.npeonelove.backend.model.achievement.UserAchievementId;
import org.npeonelove.backend.model.user.User;
import org.npeonelove.backend.repository.AchievementRepository;
import org.npeonelove.backend.repository.ScenarioRepository;
import org.npeonelove.backend.repository.UserAchievementRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AchievementService {

    private final AchievementRepository achievementRepository;
    private final UserAchievementRepository userAchievementRepository;
    private final ModelMapper modelMapper;
    private final UserService userService;

//    // Основной метод для выдачи XP и проверки ачивок
//    @Transactional
//    public void addExperienceAndCheckAchievements(Long userId, Integer expToAdd) {
//        // Добавляем опыт
//        userService.addExperience(userId, expToAdd);
//
//
//        // Проверяем и выдаем ачивки
//        checkAndAwardExperienceAchievements(userId);
//    }

    // Метод для проверки и выдачи ачивок за опыт
    @Transactional
    public Boolean checkAndAwardExperienceAchievements(Long userId) {
        User user = userService.getUserById(userId);
        Integer experience = user.getExperience();

        // Получаем все ачивки за опыт которые пользователь еще не получил
        List<Achievement> availableAchievements = achievementRepository
                .findByTypeAndRequiredExpLessThanEqualAndIdNotInUserAchievements(
                        "EXPERIENCE", experience, userId);

        // Выдаем каждую подходящую ачивку
        for (Achievement achievement : availableAchievements) {
            awardAchievement(userId, achievement.getAchievementId());
        }

        return true;
    }

    // Метод для выдачи конкретной ачивки
    @Transactional
    public void awardAchievement(Long userId, UUID achievementId) {
        if (!userAchievementRepository.existsByUserIdAndAchievementId(userId, achievementId)) {
            User user = userService.getUserById(userId);
            Achievement achievement = achievementRepository.findById(achievementId)
                    .orElseThrow(() -> new RuntimeException("Achievement not found"));

            UserAchievement userAchievement = UserAchievement.builder()
                    .id(new UserAchievementId(userId, achievementId))
                    .user(user)
                    .achievement(achievement)
                    .build();

            userAchievementRepository.save(userAchievement);
            System.out.println("Achievement awarded: " + achievementId + " to user: " + userId);
        }
    }

    // Получить все ачивки пользователя
    public List<GetAchievementResponseDTO> getUserAchievements(Long userId) {
        User user = userService.getUserById(userId);
        List<GetAchievementResponseDTO> achievements = new ArrayList<>();
        for (Achievement achievement : achievementRepository.findByUserId(user.getUserId())) {
            achievements.add(modelMapper.map(achievement, GetAchievementResponseDTO.class));
        }
        return achievements;
    }
}