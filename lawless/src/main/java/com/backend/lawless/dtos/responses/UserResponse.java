package com.backend.lawless.dtos.responses;

import com.backend.lawless.dtos.parts.UserPersonalData;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@ApiModel(value = "UserResp")
public class UserResponse {
    private UserPersonalData userPersonalData;
}
