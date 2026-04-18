package com.inges_en_desarrollo.Inventario.controller;


import com.inges_en_desarrollo.Inventario.model.Activo;
import com.inges_en_desarrollo.Inventario.repository.ActivoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/activos")
@CrossOrigin(origins = "*")
public class ActivoController {

    @Autowired
    private ActivoRepository activoRepository;

    @GetMapping
    public List<Activo> listarTodos() {
        return activoRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Activo> guardarActivo(@RequestBody Activo activo) {
        Activo nuevo = activoRepository.save(activo);
        return new ResponseEntity<>(nuevo, HttpStatus.CREATED);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Activo> actualizar(@PathVariable Long id, @RequestBody Activo detalles) {
        return activoRepository.findById(id).map(act -> {
            act.setNombre(detalles.getNombre());
            act.setEstado(detalles.getEstado());
            act.setValorCompra(detalles.getValorCompra());
            act.setCodigoSku(detalles.getCodigoSku());
            act.setFechaAdquisicion(detalles.getFechaAdquisicion());
            return new ResponseEntity<>(activoRepository.save(act), HttpStatus.OK);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        activoRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}