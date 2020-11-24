package com.backend.lawless.entities;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

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
    private boolean paid;
    private Date timeStamp;

    //connections to other tables
    @ManyToMany
    @JoinTable(name = "orders_caffs",
            joinColumns = {
                    @JoinColumn(name = "order_id", referencedColumnName = "id", nullable = false, updatable = false)
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "caff_id", referencedColumnName = "id", nullable = false, updatable = false)
            })
    private List<Caff> caff;
}
