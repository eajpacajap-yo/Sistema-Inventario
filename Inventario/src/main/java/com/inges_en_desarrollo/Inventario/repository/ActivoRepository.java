package com.inges_en_desarrollo.Inventario.repository;

import com.inges_en_desarrollo.Inventario.model.Activo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivoRepository extends JpaRepository<Activo, Long> {
}