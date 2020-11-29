package com.backend.lawless.dtos.requests;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

@Data
@AllArgsConstructor
@ApiModel(value = "CommentAddCaffReq")

public class CommentAddCaffRequest {
	private Long caffId;
	private String message;

}
