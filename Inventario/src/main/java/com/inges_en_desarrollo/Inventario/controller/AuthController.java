package com.inges_en_desarrollo.Inventario.controller; 

import com.inges_en_desarrollo.Inventario.model.LoginRequest;
import com.inges_en_desarrollo.Inventario.model.usuario;
import com.inges_en_desarrollo.Inventario.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") 
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        // 1. Buscar al usuario por email
        Optional<usuario> usuarioOpt = usuarioRepository.findByEmail(loginRequest.getEmail());

        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("El correo electrónico no está registrado.");
        }

        usuario usuario = usuarioOpt.get();

        // 2. Validar la contraseña 
        if (!usuario.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Contraseña incorrecta.");
        }

        // 3. Si todo está bien, devolvemos los datos del usuario (menos el password por seguridad)
        usuario.setPassword(null); 
        return ResponseEntity.ok(usuario);
    }
}