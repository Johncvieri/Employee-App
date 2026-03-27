package com.enigmacamp.testwebmvc.dto;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PositionResponseDTO {
    private Integer id;
    private String code;
    private String name;
}