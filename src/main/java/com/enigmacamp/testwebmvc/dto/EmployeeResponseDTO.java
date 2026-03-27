package com.enigmacamp.testwebmvc.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeResponseDTO {
    private Integer id;
    private String name;
    private LocalDate birthDate;
    private Integer idNumber;
    private Integer gender;
    private Integer positionId;
    private String positionName;
}
