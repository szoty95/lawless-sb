package com.backend.lawless.daos;

import com.backend.lawless.entities.Caff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CaffRepository extends JpaRepository<Caff, Long> {
}
