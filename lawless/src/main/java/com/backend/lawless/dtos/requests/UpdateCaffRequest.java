package com.backend.lawless.dtos.requests;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "UpdateCaffReq")
public class UpdateCaffRequest {
    private String caffId;
    private String name;
    private String description;
    private double price;
}
