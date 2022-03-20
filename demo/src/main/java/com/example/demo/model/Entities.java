package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Entities {
    @Id
    @Column(columnDefinition = "VARCHAR(255)")
    private String entitiesId;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate inDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate outDate;

    @Column(columnDefinition = "VARCHAR(255)")
    private String status;

    private float weight;

    private Boolean isDelete;

    @ManyToOne(targetEntity = Cage.class)
    @JoinColumn(name = "cageId", referencedColumnName = "cageId")
    private Cage cage;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "entities", cascade = CascadeType.REMOVE)
    private Set<EntitiesIllness> entities;
}
