package com.backend.lawless.dtos.parts;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@ApiModel(value = "Role")
public class RoleDto {
    private RoleEnum name;
}
