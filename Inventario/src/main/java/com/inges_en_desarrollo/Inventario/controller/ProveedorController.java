package com.inges_en_desarrollo.Inventario.controller;

import com.inges_en_desarrollo.Inventario.model.Proveedor;
import com.inges_en_desarrollo.Inventario.repository.ProveedorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/proveedores")
@CrossOrigin(origins = "*")
public class ProveedorController {

    @Autowired
    private ProveedorRepository proveedorRepository;

    // Obtener todos los proveedores
    @GetMapping
    public List<Proveedor> listarProveedores() {
        return proveedorRepository.findAllByOrderByIdAsc();
    }

    // Crear un nuevo proveedor
    @PostMapping
    public ResponseEntity<Proveedor> guardarProveedor(@RequestBody Proveedor proveedor) {
        Proveedor nuevo = proveedorRepository.save(proveedor);
        return new ResponseEntity<>(nuevo, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Proveedor> actualizar(@PathVariable Long id, @RequestBody Proveedor detalles) {
        return proveedorRepository.findById(id).map(p -> {
            p.setNombre(detalles.getNombre());
            p.setTelefono(detalles.getTelefono());
            return new ResponseEntity<>(proveedorRepository.save(p), HttpStatus.OK);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (proveedorRepository.existsById(id)) {
            proveedorRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}