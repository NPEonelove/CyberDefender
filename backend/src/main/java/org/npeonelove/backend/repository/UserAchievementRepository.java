package org.npeonelove.backend.repository;

import org.npeonelove.backend.model.achievement.UserAchievement;
import org.npeonelove.backend.model.achievement.UserAchievementId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface UserAchievementRepository extends JpaRepository<UserAchievement, UserAchievementId> {

    @Query(value = "SELECT achievement_id FROM user_achievements WHERE user_id = :userId", nativeQuery = true)
    List<UUID> findAchievementIdsByUserId(@Param("userId") Long userId);

    @Query(value = "SELECT EXISTS(SELECT 1 FROM user_achievements WHERE user_id = :userId AND achievement_id = :achievementId)", nativeQuery = true)
    boolean existsByUserIdAndAchievementId(@Param("userId") Long userId, @Param("achievementId") UUID achievementId);
}