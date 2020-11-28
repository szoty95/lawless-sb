package com.backend.lawless.dtos.responses;


import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "DetailsAllCaffResp")
public class DetailsAllCaffResponse {
	private List<DetailsCaffResponse> detailsAllCaffResponse;
}
