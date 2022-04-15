package com.example.demo.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

//Format: Ctrl+ Alt+ L
@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Account {
    @Id
    @Column(columnDefinition = "VARCHAR(255)")
    private String accountId;

    @Column(columnDefinition = "VARCHAR(255)")
    private String accountName;

    @Column(columnDefinition = "VARCHAR(255)")
    private String password;

    //    It
    @OneToOne(mappedBy = "account")
    private Employee employee;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "account", cascade = CascadeType.REMOVE)
    private Set<AccountRole> roleSet;


}
