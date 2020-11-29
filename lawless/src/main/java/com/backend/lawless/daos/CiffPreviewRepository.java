package com.backend.lawless.daos;

import com.backend.lawless.entities.CiffPreview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CiffPreviewRepository extends JpaRepository<CiffPreview, Long> {
}
