package org.npeonelove.backend.dto.scenario;

import lombok.Getter;
import lombok.Setter;
import org.npeonelove.backend.model.Scenario.Type;

import java.util.UUID;

@Getter
@Setter
public class ScenarioListResponseDTO {

    private UUID scenarioId;
    private String title;
    private Type type;

}
