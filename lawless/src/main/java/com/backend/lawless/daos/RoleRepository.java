package com.backend.lawless.daos;

import com.backend.lawless.entities.ERole;
import com.backend.lawless.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RoleRepository extends JpaRepository<Role, Long> {
    @Query("SELECT r FROM Role r WHERE r.name = ?1")
    Role findByName(ERole role);
}
