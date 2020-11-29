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
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;

    public Tag(String name) {
        this.name = name;
    }
}
