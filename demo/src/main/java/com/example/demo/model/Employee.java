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
public class Employee {
    @Id
    @Column(columnDefinition = "VARCHAR(255)")
    private String employeeId;

    @Column(columnDefinition = "VARCHAR(255)")
    private String employeeName;

    @Column(columnDefinition = "VARCHAR(255)")
    private String email;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthday;

    @Column(columnDefinition = "VARCHAR(255)")
    private String gender;

    @Column(columnDefinition = "VARCHAR(255)")
    private String idCard;

    @Column(columnDefinition = "VARCHAR(255)")
    private String avartar;

    private Boolean isDelete;

    @Column(columnDefinition = "VARCHAR(255)")
    private String address;

    //    mot role
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "accountId", referencedColumnName = "accountId")
    private Account account;

    //    mot news
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "employee", cascade = CascadeType.REMOVE)
    private Set<News> news;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "employeeCage", cascade = CascadeType.REMOVE)
    private Set<Cage> cage;
}
