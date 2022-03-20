package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Role {
    @Id
    @Column(columnDefinition = "VARCHAR(50)")
    private String roleId;

    @Column(columnDefinition = "VARCHAR(50)")
    private String roleName;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "role", cascade = CascadeType.REMOVE)
    private Set<AccountRole> roleSet;
}
