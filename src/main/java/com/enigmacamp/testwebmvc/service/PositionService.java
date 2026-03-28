package com.enigmacamp.testwebmvc.service;

import com.enigmacamp.testwebmvc.dto.PositionResponseDTO;
import com.enigmacamp.testwebmvc.repository.PositionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PositionService {
    private final PositionRepository repo;

    public List<PositionResponseDTO> getAll() {
        return repo.findByIsDelete(0).stream()
                .map(p -> PositionResponseDTO.builder()
                        .id(p.getId())
                        .code(p.getCode())
                        .name(p.getName())
                        .build())
                .collect(Collectors.toList());
    }
}