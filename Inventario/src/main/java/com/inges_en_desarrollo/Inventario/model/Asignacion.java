package com.inges_en_desarrollo.Inventario.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "asignaciones")
public class Asignacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate fechaAsignacion;
    private LocalDate fechaDevolucion;
    private String observaciones;

    @ManyToOne
    @JoinColumn(name = "activo_id")
    private Activo activo;

    @ManyToOne
    @JoinColumn(name = "empleado_id")
    private Empleado empleado;

    // CONSTRUCTORES

    // Constructor vacío obligatorio para JPA
    public Asignacion() {
    }

    // Constructor útil para registrar una nueva asignación rápidamente
    public Asignacion(LocalDate fechaAsignacion, Activo activo, Empleado empleado) {
        this.fechaAsignacion = fechaAsignacion;
        this.activo = activo;
        this.empleado = empleado;
    }

    // GETTERS Y SETTERS 
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public LocalDate getFechaAsignacion() { return fechaAsignacion; }
    public void setFechaAsignacion(LocalDate fechaAsignacion) { this.fechaAsignacion = fechaAsignacion; }
    public LocalDate getFechaDevolucion() { return fechaDevolucion; }
    public void setFechaDevolucion(LocalDate fechaDevolucion) { this.fechaDevolucion = fechaDevolucion; }
    public String getObservaciones() { return observaciones; }
    public void setObservaciones(String observaciones) { this.observaciones = observaciones; }
    public Activo getActivo() { return activo; }
    public void setActivo(Activo activo) { this.activo = activo; }
    public Empleado getEmpleado() { return empleado; }
    public void setEmpleado(Empleado empleado) { this.empleado = empleado; }
}