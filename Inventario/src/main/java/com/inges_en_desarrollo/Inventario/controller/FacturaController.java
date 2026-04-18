package com.inges_en_desarrollo.Inventario.controller;

import com.inges_en_desarrollo.Inventario.model.Factura;
import com.inges_en_desarrollo.Inventario.repository.FacturaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/facturas")
@CrossOrigin(origins = "*")
public class FacturaController {

    @Autowired
    private FacturaRepository facturaRepository;

    @GetMapping
    public List<Factura> listarTodos() {
        return facturaRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Factura> guardarFactura(@RequestBody Factura factura) {
        Factura nueva = facturaRepository.save(factura);
        return new ResponseEntity<>(nueva, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Factura> actualizar(@PathVariable Long id, @RequestBody Factura detalles) {
        return facturaRepository.findById(id).map(f -> {
            f.setNumeroFactura(detalles.getNumeroFactura());
            f.setFecha(detalles.getFecha());
            return new ResponseEntity<>(facturaRepository.save(f), HttpStatus.OK);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        facturaRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}