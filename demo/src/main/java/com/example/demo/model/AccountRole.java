package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class AccountRole {
    @Id
    @Column(columnDefinition = "VARCHAR(255)")
    private String accRoleId;


    //    Nhieu
    @ManyToOne(targetEntity = Account.class)
    @JoinColumn(name = "accountId", referencedColumnName = "accountId")
    private Account account;

    //    Nhieu
    @ManyToOne(targetEntity = Role.class)
    @JoinColumn(name = "roleId", referencedColumnName = "roleId")
    private Role role;
}
