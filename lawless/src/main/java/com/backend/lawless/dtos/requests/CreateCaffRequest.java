package com.backend.lawless.dtos.requests;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.Serializable;

@Data
@AllArgsConstructor
@ApiModel(value = "CreateCaffReq")
public class CreateCaffRequest implements Serializable {
    private String name;
    private String description;
    private double price;
//    private MultipartFile caffFile;
}
