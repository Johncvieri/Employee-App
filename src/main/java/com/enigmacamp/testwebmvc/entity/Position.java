package com.enigmacamp.testwebmvc.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "t1_position")

public class Position {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Mengikuti SERIAL psql
    private Integer id;
    private String code;
    private String name;
    @Column(name = "is_delete")
    private Integer isDelete = 0;
}