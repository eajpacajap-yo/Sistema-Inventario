package com.inges_en_desarrollo.Inventario;

import com.inges_en_desarrollo.Inventario.model.usuario;
import com.inges_en_desarrollo.Inventario.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class InventarioApplication {

    public static void main(String[] args) {
        SpringApplication.run(InventarioApplication.class, args);
    }

    @Bean
    CommandLineRunner initDatabase(UsuarioRepository usuarioRepository) {
        return args -> {
            if (!usuarioRepository.findByEmail("admin@correo.com").isPresent()) {
                usuario admin = new usuario();
                admin.setEmail("admin@correo.com");
                admin.setPassword("admin123");
                admin.setNombre("Administrador");
                
                usuarioRepository.save(admin);
                System.out.println(">>> USUARIO ADMIN CREADO EXITOSAMENTE <<<");
            }
        };
    }
}