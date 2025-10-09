package com.example.demo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long> {

    List<Animal> getAnimalByDescription(String description);

    @Query(value = "select * from Animal a where a.name like concat('%', ?1, '%')", nativeQuery = true)
    List<Animal> getAnimalByName(String name);

    @Query(value = "select * from Animal a where a.title like concat('%', ?1, '%')", nativeQuery = true)
    List<Animal> getAnimalByTitle(String title);
}
