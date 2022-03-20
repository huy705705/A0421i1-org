package com.example.demo.repository;

import com.example.demo.model.Cage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CageRepo extends JpaRepository<Cage, String> {
}