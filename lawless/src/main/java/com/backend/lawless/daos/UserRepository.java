package com.backend.lawless.daos;

import com.backend.lawless.entities.User;
import com.sun.istack.NotNull;
import com.sun.xml.bind.v2.model.core.ID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    User findById(long id);

    User findByEmail(String email);

    Boolean existsByUsername(String username);


    Boolean existsByEmail(String email);
}
