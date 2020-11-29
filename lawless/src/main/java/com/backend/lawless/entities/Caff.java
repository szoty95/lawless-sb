package com.backend.lawless.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.io.File;
import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name = "caffs",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "id")
        })
public class Caff {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private String name;

    private String description;

    private Date uploaded;

    private double price;
    //Caff file

    private byte[] caffFile;

    //connection to other tables
    @OneToMany(cascade = CascadeType.ALL)
    private List<Ciff> ciffs;

    @OneToMany()
    private List<Comment> comments;

    public void addComments(Comment comment){
        this.comments.add(comment);
    }


}
