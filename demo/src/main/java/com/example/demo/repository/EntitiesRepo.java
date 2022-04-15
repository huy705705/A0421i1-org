package com.example.demo.repository;


import com.example.demo.model.Entities;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntitiesRepo extends JpaRepository<Entities, String> {
}