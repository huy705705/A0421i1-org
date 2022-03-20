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
public class Cage {
    @Id
    @Column(columnDefinition = "VARCHAR(255)")
    private String cageId;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate createdDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate closedDate;

    private int quantity;

    private float area;

    private Boolean isDelete;

    @ManyToOne(targetEntity = Employee.class)
    @JoinColumn(name = "employeeId", referencedColumnName = "employeeId")
    private Employee employeeCage;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "cage", cascade = CascadeType.REMOVE)
    private Set<Entities> entities;


}
