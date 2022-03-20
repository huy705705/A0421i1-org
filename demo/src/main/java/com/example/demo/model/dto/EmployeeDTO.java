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
public class EmployeeDTO {

    private String employeeId;

    private String employeeName;

    private String email;

    private LocalDate birthday;

    private String gender;

    private String idCard;

    private String avartar;

    private Boolean isDelete;

    private String address;

    private String accountId;

}
