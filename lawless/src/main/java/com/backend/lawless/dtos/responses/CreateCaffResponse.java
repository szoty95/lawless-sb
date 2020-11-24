package com.backend.lawless.dtos.responses;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@ApiModel(value = "CreateCaffResp")
public class CreateCaffResponse {
    private Long id;
}
