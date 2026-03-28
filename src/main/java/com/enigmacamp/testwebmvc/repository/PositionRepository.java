package com.enigmacamp.testwebmvc.repository;

import com.enigmacamp.testwebmvc.entity.Position;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PositionRepository extends JpaRepository<Position, Integer> {
    List<Position> findByIsDelete(Integer isDelete);
}
