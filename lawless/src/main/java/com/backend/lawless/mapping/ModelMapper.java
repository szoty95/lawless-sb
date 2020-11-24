package com.backend.lawless.mapping;

import com.backend.lawless.dtos.parts.RoleDto;
import com.backend.lawless.dtos.parts.RoleEnum;
import com.backend.lawless.entities.ERole;
import com.backend.lawless.entities.Role;

import java.util.ArrayList;
import java.util.List;

public class ModelMapper {

    public static RoleEnum beToDto(ERole role) {
        if (role != null) {
            switch (role) {
                case ROLE_USER:
                    return RoleEnum.ROLE_USER;
                case ROLE_ADMIN:
                    return RoleEnum.ROLE_ADMIN;
                default:
                    return null;
            }
        } else {
            return null;
        }
    }

    public static List<RoleDto> beToDto(List<Role> roles) {
        if (roles == null) {
            return null;
        }
        List<RoleDto> roleDtos = new ArrayList<>();
        roles.forEach(role -> {
            roleDtos.add(new RoleDto(beToDto(role.getName())));
        });
        return roleDtos;
    }
}
