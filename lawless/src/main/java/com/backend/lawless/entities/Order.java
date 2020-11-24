package com.backend.lawless.entities;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "orders",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "id")
        })

public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private double price;
    private Date timeStamp;

    //connections to other tables
    @ManyToMany
    private Caff caff;
    @ManyToOne
    private User user;
}
