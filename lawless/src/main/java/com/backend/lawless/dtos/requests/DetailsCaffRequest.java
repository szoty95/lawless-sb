package com.backend.lawless.dtos.requests;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@ApiModel(value = "DetailsCaffReq")
public class DetailsCaffRequest {
	private String caffId;
}
