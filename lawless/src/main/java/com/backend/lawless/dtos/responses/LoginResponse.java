package com.backend.lawless.dtos.responses;

import com.backend.lawless.dtos.parts.UserPersonalData;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@ApiModel(value = "LoginResp")
public class LoginResponse {
    private String token;
    private UserPersonalData userPersonalData;
}
