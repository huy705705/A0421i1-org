package com.example.demo.model.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EntitiesIllnessDTO {

    private String entitiesIllnessId;

    private LocalDate createdDate;

    private String detailDescription;

    private Boolean isDelete;

    private String entitiesId;


}
