package com.enigmacamp.testwebmvc.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "t2_employee")
    public class Employee {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer id;

        private String name;

        @Column(name = "birth_date")
        private LocalDate birthDate;

        @ManyToOne(fetch = FetchType.EAGER)
        @JoinColumn(name = "position_id")
        private Position position;

        @Column(name = "id_number")
        private Integer idNumber;

        private Integer gender;

        @Column(name = "is_delete", nullable = false)
        private Integer isDelete = 0;
}
