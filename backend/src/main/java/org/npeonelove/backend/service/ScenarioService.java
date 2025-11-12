package org.npeonelove.backend.service;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.npeonelove.backend.dto.scenario.ScenarioListResponseDTO;
import org.npeonelove.backend.model.Scenario.Scenario;
import org.npeonelove.backend.model.Scenario.Type;
import org.npeonelove.backend.repository.ScenarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ScenarioService {

    private final ScenarioRepository scenarioRepository;
    private final ModelMapper modelMapper;

    // получение всех сценариев
    public List<ScenarioListResponseDTO>  getAllScenarios() {
        List<Scenario> scenarios = scenarioRepository.findAll();
        List<ScenarioListResponseDTO> scenarioListResponseDTOList = new ArrayList<>();
        for (Scenario scenario : scenarios) {
            scenarioListResponseDTOList.add(modelMapper.map(scenario, ScenarioListResponseDTO.class));
        }
        return scenarioListResponseDTOList;
    }

    // получение всех сценариев по определенному типу
    public List<ScenarioListResponseDTO> getScenariosByTypeId(UUID typeId) {
        List<Scenario> scenarios = scenarioRepository.findScenarioByType_TypeId(typeId);
        List<ScenarioListResponseDTO> scenarioListResponseDTOList = new ArrayList<>();
        for (Scenario scenario : scenarios) {
            if (scenario.getType().getTypeId().equals(typeId)) {
                scenarioListResponseDTOList.add(modelMapper.map(scenario, ScenarioListResponseDTO.class));
            }
        }
        return scenarioListResponseDTOList;
    }

}
