package com.enigmacamp.testwebmvc.service;

import com.enigmacamp.testwebmvc.dto.EmployeeRequestDTO;
import com.enigmacamp.testwebmvc.dto.EmployeeResponseDTO;
import com.enigmacamp.testwebmvc.entity.Employee;
import com.enigmacamp.testwebmvc.entity.Position;
import com.enigmacamp.testwebmvc.repository.EmployeeRepository;
import com.enigmacamp.testwebmvc.repository.PositionRepository;
import com.enigmacamp.testwebmvc.util.ApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final PositionRepository positionRepository;

    public List<EmployeeResponseDTO> getAll() {
        return employeeRepository.findAllActive().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public EmployeeResponseDTO create(EmployeeRequestDTO dto) {
        if (employeeRepository.existsByNip(dto.getIdNumber())) {
            throw new ApiException("NIP sudah digunakan");
        }

        Position position = positionRepository.findById(dto.getPositionId())
                .orElseThrow(() -> new ApiException("Jabatan tidak ditemukan"));

        Employee employee = new Employee();
        employee.setName(dto.getName());
        employee.setBirthDate(dto.getBirthDate());
        employee.setPosition(position);
        employee.setIdNumber(dto.getIdNumber());
        employee.setGender(dto.getGender());

        return mapToResponseDTO(employeeRepository.save(employee));
    }

    @Transactional
    public EmployeeResponseDTO update(Integer id, EmployeeRequestDTO dto) {
        Employee existing = employeeRepository.findById(id)
                .orElseThrow(() -> new ApiException("Data tidak ditemukan"));

        if (!existing.getIdNumber().equals(dto.getIdNumber())) {
            if (employeeRepository.existsByNip(dto.getIdNumber())) {
                throw new ApiException("NIP sudah digunakan");
            }
        }
        Position position = positionRepository.findById(dto.getPositionId())
                .orElseThrow(() -> new ApiException("Jabatan tidak ditemukan"));
        existing.setName(dto.getName());
        existing.setBirthDate(dto.getBirthDate());
        existing.setPosition(position);
        existing.setIdNumber(dto.getIdNumber());
        existing.setGender(dto.getGender());

        return mapToResponseDTO(employeeRepository.save(existing));
    }

    @Transactional
    public void delete(Integer id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ApiException("Data tidak ditemukan"));
        employee.setIsDelete(1);
        employeeRepository.save(employee);
    }

    private EmployeeResponseDTO mapToResponseDTO(Employee emp) {
        return EmployeeResponseDTO.builder()
                .id(emp.getId())
                .name(emp.getName())
                .birthDate(emp.getBirthDate())
                .idNumber(emp.getIdNumber())
                .gender(emp.getGender())
                .positionId(emp.getPosition().getId())
                .positionName(emp.getPosition().getName())
                .build();
    }
}