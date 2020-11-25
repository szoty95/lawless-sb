package com.backend.lawless.dtos.requests;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.File;

@Data
@AllArgsConstructor
@ApiModel(value = "CreateCaffReq")
public class CreateCaffRequest {
    private String name;
    private String description;
    private double price;
    private File caffFile;
}
