package com.inges_en_desarrollo.Inventario.repository;

import com.inges_en_desarrollo.Inventario.model.Empleado;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {
    List<Empleado> findAllByOrderByIdAsc();
}