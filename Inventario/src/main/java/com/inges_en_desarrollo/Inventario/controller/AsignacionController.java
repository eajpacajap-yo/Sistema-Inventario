package com.inges_en_desarrollo.Inventario.controller;

import com.inges_en_desarrollo.Inventario.model.Asignacion;
import com.inges_en_desarrollo.Inventario.repository.AsignacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/asignaciones")
@CrossOrigin(origins = "*")
public class AsignacionController {

    @Autowired
    private AsignacionRepository asignacionRepository;

    @GetMapping
    public List<Asignacion> listarTodos() {
        return asignacionRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Asignacion> guardarAsignacion(@RequestBody Asignacion asignacion) {
        Asignacion nueva = asignacionRepository.save(asignacion);
        return new ResponseEntity<>(nueva, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Asignacion> actualizar(@PathVariable Long id, @RequestBody Asignacion detalles) {
        return asignacionRepository.findById(id).map(a -> {
            a.setFechaAsignacion(detalles.getFechaAsignacion());
            a.setObservaciones(detalles.getObservaciones());
            a.setFechaDevolucion(detalles.getFechaDevolucion());
            return new ResponseEntity<>(asignacionRepository.save(a), HttpStatus.OK);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        asignacionRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}