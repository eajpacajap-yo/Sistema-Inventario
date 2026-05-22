package com.inges_en_desarrollo.Inventario.repository; // Ajusta el package

import com.inges_en_desarrollo.Inventario.model.usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<usuario, Long> {

    Optional<usuario> findByEmail(String email);
}