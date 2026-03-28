package com.enigmacamp.testwebmvc.controller;

import com.enigmacamp.testwebmvc.dto.EmployeeRequestDTO;
import com.enigmacamp.testwebmvc.dto.EmployeeResponseDTO;
import com.enigmacamp.testwebmvc.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class EmployeeController {

    private final EmployeeService service;

    @GetMapping
    public List<EmployeeResponseDTO> getAll() {
        return service.getAll();
    }

    @PostMapping
    public EmployeeResponseDTO create(@RequestBody EmployeeRequestDTO dto) {
        return service.create(dto);
    }

    @PutMapping("/{id}")
    public EmployeeResponseDTO update(@PathVariable Integer id, @RequestBody EmployeeRequestDTO dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
}