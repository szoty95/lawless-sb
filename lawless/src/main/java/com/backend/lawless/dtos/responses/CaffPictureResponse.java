package com.backend.lawless.dtos.responses;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "CaffPictureResponse")
public class CaffPictureResponse {
    @ApiModelProperty(dataType = "BYTE")
    private byte[] previewPicture;
}
