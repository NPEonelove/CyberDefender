package org.npeonelove.backend.dto.achievement;

import lombok.Getter;
import lombok.Setter;
import org.npeonelove.backend.model.achievement.Type;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
public class GetAchievementResponseDTO {

    private UUID achievementId;
    private String name;
    private String description;
    private String icon;
    private Integer requiredExp;
    private Type type;
    private LocalDateTime earnedAt;

}
