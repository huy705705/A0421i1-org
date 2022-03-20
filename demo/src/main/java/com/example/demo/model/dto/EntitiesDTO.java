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
public class EntitiesDTO {

    private String entitiesId;

    private LocalDate inDate;

    private LocalDate outDate;

    private String status;

    private float weight;

    private Boolean isDelete;

    private String cageId;

}
