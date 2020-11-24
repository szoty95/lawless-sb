package com.backend.lawless.entities;

import lombok.Data;

import javax.persistence.*;
import java.io.File;

@Entity
@Data
@Table(name = "ciffs",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "id")
        })
public class Ciff {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    //image file
    private byte[] ciffFilePreview;
    private String caption;
    private int width;
    private int height;

    //connecting to other tables
    @ManyToOne
    Caff caff;
}
