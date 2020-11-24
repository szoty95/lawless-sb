package com.backend.lawless.entities;

import lombok.Data;

import javax.persistence.*;
import java.io.File;

@Entity
@Data
@Table(name = "caffs",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "id")
        })
public class Caff {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private double price;
    //Caff file
    private byte[] caffFile;

    //connection to other tables
    @OneToMany
    Ciff[] ciffs;


}
