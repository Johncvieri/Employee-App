package com.enigmacamp.testwebmvc.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeRequestDTO {
    private String name;
    private LocalDate birthDate;
    private Integer positionId;
    private Integer idNumber;
    private Integer gender;
}