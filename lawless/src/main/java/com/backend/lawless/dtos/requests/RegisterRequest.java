package com.backend.lawless.dtos.requests;

import com.backend.lawless.dtos.parts.UserPersonalData;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@ApiModel(value = "RegisterReq")
public class RegisterRequest {
    private UserPersonalData userPersonalData;
    private String password;
}
