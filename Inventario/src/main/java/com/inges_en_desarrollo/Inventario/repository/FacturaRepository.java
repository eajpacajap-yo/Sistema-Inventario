package com.inges_en_desarrollo.Inventario.repository;

import com.inges_en_desarrollo.Inventario.model.Factura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FacturaRepository extends JpaRepository<Factura, Long> {
}
