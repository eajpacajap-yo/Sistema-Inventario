package com.inges_en_desarrollo.Inventario.controller;

import com.inges_en_desarrollo.Inventario.model.Empleado;
import com.inges_en_desarrollo.Inventario.repository.EmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/empleados")
@CrossOrigin(origins = "*")
public class EmpleadoController {

    @Autowired
    private EmpleadoRepository empleadoRepository;

    // 1. OBTENER todos los empleados (GET)
    @GetMapping
    public List<Empleado> listarTodos() {
        return empleadoRepository.findAllByOrderByIdAsc();
    }

    // 2. CREAR un empleado (POST)
    @PostMapping
    public ResponseEntity<Empleado> guardarEmpleado(@RequestBody Empleado empleado) {
        Empleado nuevo = empleadoRepository.save(empleado);
        return new ResponseEntity<>(nuevo, HttpStatus.CREATED);
    }

    // 3. ACTUALIZAR (PUT)
    @PutMapping("/{id}")
    public ResponseEntity<Empleado> actualizar(@PathVariable Long id, @RequestBody Empleado detalles) {
        return empleadoRepository.findById(id).map(emp -> {
            emp.setNombre(detalles.getNombre());
            emp.setDepartamento(detalles.getDepartamento());
            return new ResponseEntity<>(empleadoRepository.save(emp), HttpStatus.OK);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // 4. ELIMINAR (DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (empleadoRepository.existsById(id)) {
            empleadoRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
