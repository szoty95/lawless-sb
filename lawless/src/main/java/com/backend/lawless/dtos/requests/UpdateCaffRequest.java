package com.backend.lawless.dtos.requests;

import com.backend.lawless.entities.Caff;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;


@Data
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "UpdateCaffReq")
public class UpdateCaffRequest {
    private String caffId;
    private byte[] caffFile;
    private String name;
    private String description;
    private Double price;
}
