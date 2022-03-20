package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class News {
    @Id
    @Column(columnDefinition = "VARCHAR(255)")
    private String newsId;

    @Column(columnDefinition = "VARCHAR(255)")
    private String newsName;

    @Column(columnDefinition = "VARCHAR(255)")
    private String detailDescription;

    @Column(columnDefinition = "VARCHAR(2000)")
    private String content;

    @Column(columnDefinition = "VARCHAR(300)")
    private String highlight;

    @Column(columnDefinition = "VARCHAR(500)")
    private String image;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate createdDate;

    private Boolean isDelete;

    @ManyToOne(targetEntity = Employee.class)
    @JoinColumn(name = "employeeId", referencedColumnName = "employeeId")
    private Employee employee;


}
