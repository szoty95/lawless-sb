package com.backend.lawless.dtos.responses;

import com.backend.lawless.dtos.parts.UserPersonalData;
import com.backend.lawless.entities.Caff;
import com.backend.lawless.entities.Comment;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "DetailsCaffResp")
public class DetailsCaffResponse {

	private Long id;

	private Long userId;

	private String name;

	private String description;

	private Date uploaded;

	private double price;

	private List<Comment> comments;

	@ApiModelProperty(dataType = "BYTE")
	private List<byte[]> previewPictureUrl;

	public DetailsCaffResponse(Caff caff){

		id = caff.getId();
		userId= caff.getUserId();
		name = caff.getName();
		description = caff.getDescription();
		uploaded= caff.getUploaded();
		price = caff.getPrice();
		comments=caff.getComments();
		previewPictureUrl = new ArrayList<>();
		caff.getCiffs().forEach(ciff -> {
			previewPictureUrl.add(ciff.getCiffFilePreview());
		});

	}
	private UserPersonalData userPersonalData;
}
