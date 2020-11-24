package com.backend.lawless.entities;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name ="roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private ERole name;
}
