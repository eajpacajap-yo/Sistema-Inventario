package com.inges_en_desarrollo.Inventario.repository;

import com.inges_en_desarrollo.Inventario.model.Proveedor;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProveedorRepository extends JpaRepository<Proveedor, Long> {
    List<Proveedor> findAllByOrderByIdAsc();
}
