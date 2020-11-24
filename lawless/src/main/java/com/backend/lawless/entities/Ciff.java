package com.backend.lawless.entities;

import lombok.Data;

import javax.persistence.*;
import java.io.File;
import java.util.List;

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

    //    //connecting to other tables
    @ManyToMany
    @JoinTable(name = "ciffs_tags",
            joinColumns = {
                    @JoinColumn(name = "ciff_id", referencedColumnName = "id", nullable = false, updatable = false)
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "tag_id", referencedColumnName = "id", nullable = false, updatable = false)
            })
    private List<Tag> tags;
//    @ManyToOne
//    Caff caff;
}
