// AchievementRepository.java (дополненная)
package org.npeonelove.backend.repository;

import org.npeonelove.backend.model.achievement.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AchievementRepository extends JpaRepository<Achievement, UUID> {

    @Query(value = "SELECT * FROM achievements WHERE type = :type", nativeQuery = true)
    List<Achievement> findAchievementsByType(@Param("type") String type);

    @Query(value = """
        SELECT a.* FROM achievements a 
        WHERE a.type = :type 
        AND a.required_exp <= :experience 
        AND a.achievement_id NOT IN (
            SELECT ua.achievement_id FROM user_achievements ua 
            WHERE ua.user_id = :userId
        )
        """, nativeQuery = true)
    List<Achievement> findByTypeAndRequiredExpLessThanEqualAndIdNotInUserAchievements(
            @Param("type") String type,
            @Param("experience") Integer experience,
            @Param("userId") Long userId);

    @Query(value = """
        SELECT a.* FROM achievements a 
        INNER JOIN user_achievements ua ON a.achievement_id = ua.achievement_id 
        WHERE ua.user_id = :userId
        """, nativeQuery = true)
    List<Achievement> findByUserId(@Param("userId") Long userId);
}