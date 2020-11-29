package com.backend.lawless.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "CiffPreview",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "id")
        })
public class CiffPreview {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private byte[] ciffFilePreview;
}
