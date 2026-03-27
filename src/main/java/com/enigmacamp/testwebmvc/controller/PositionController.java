package com.enigmacamp.testwebmvc.controller;

import com.enigmacamp.testwebmvc.dto.PositionResponseDTO;
import com.enigmacamp.testwebmvc.service.PositionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/positions")
@RequiredArgsConstructor
public class PositionController {

    private final PositionService service;

    @GetMapping
    public List<PositionResponseDTO> getAll() {
        return service.getAll();
    }
}
