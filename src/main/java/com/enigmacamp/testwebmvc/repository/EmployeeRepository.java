package com.enigmacamp.testwebmvc.repository;

import com.enigmacamp.testwebmvc.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

    @Query("SELECT e FROM Employee e WHERE e.isDelete = 0")
    List<Employee> findAllActive();

    @Query("SELECT COUNT(e) > 0 FROM Employee e WHERE e.idNumber = :nip AND e.isDelete = 0")
    boolean existsByNip(@Param("nip") Integer nip);
}