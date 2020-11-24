package com.backend.lawless.dtos.responses;

import com.backend.lawless.dtos.parts.RoleDto;
import com.backend.lawless.dtos.parts.UserPersonalData;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
@ApiModel(value = "LoginResp")
public class LoginResponse {
    private String token;
    private UserPersonalData userPersonalData;
    private List<RoleDto> roles;
}
