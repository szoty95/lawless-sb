package com.backend.lawless.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    public Comment() {
    }

    public Comment(Long userId, String message, Date timeStamp) {
        this.userId = userId;
        this.message = message;
        this.timeStamp = timeStamp;
    }
    // connections to other tables
//    @ManyToOne
//    Caff[] caffs;
//
//    @ManyToOne
//    User[] users;

}
