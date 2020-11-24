package com.backend.lawless.dtos.requests;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@ApiModel(value = "LoginReq")
public class LoginRequest {
    private String username;
    private String email;
    private String password;
}
