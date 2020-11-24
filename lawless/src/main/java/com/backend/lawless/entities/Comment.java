package com.backend.lawless.entities;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "comments",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "id")
        })
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long userId;

    private String message;
    private Date timeStamp;

    // connections to other tables
//    @ManyToOne
//    Caff[] caffs;
//
//    @ManyToOne
//    User[] users;

}
