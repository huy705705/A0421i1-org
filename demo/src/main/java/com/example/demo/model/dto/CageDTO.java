package com.example.demo.model.dto;

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
@NoArgsConstructor
@AllArgsConstructor
public class CageDTO {

    private String cageId;

    private LocalDate createdDate;

    private LocalDate closedDate;

    private int quantity;

    private float area;

    private Boolean isDelete;

    private String employeeId;


}
