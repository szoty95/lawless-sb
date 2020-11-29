package com.backend.lawless.dtos.parts;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@ApiModel(value = "UserPersonalData")
public class UserPersonalData {
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String userId;
}
