package com.backend.lawless.entities;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "tags",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "id")
        })

public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
}
