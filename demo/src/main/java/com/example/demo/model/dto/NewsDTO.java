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
public class NewsDTO {

    private String newsId;

    private String newsName;

    private String detailDescription;

    private String content;

    private String highlight;

    private String image;

    private LocalDate createdDate;

    private Boolean isDelete;

    private String employeeId;


}
