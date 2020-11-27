package com.backend.lawless.dtos.responses;

import com.backend.lawless.entities.Caff;
import com.backend.lawless.entities.Comment;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@ApiModel(value = "DetailsCaffResp")
public class DetailsCaffResponse {

	private Long id;

	private Long userId;

	private String name;

	private String description;

	private Date uploaded;

	private double price;

	private List<Comment> comments;
}
