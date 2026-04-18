package com.inges_en_desarrollo.Inventario.model;

import jakarta.persistence.*;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "activos")
public class Activo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String codigoSku; // Para el QR
    
    private String nombre;
    private String descripcion;
    private Double valorCompra;
    private String estado; // "Disponible", "Asignado", "Baja"
    private LocalDate fechaAdquisicion;
    private Integer vidaUtilAnios; 

    @ManyToOne
    @JoinColumn(name = "factura_id")
    @JsonIgnore
    private Factura factura;

    @OneToMany(mappedBy = "activo")
    @JsonIgnore 
    private java.util.List<Asignacion> asignaciones;

    // CONSTRUCTORES

    // Constructor vacío (obligatorio para JPA/Hibernate)
    public Activo() {
    }

    // Constructor con campos
    public Activo(String codigoSku, String nombre, Double valorCompra, String estado, LocalDate fechaAdquisicion) {
        this.codigoSku = codigoSku;
        this.nombre = nombre;
        this.valorCompra = valorCompra;
        this.estado = estado;
        this.fechaAdquisicion = fechaAdquisicion;
    }

    // GETTERS Y SETTERS

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigoSku() {
        return codigoSku;
    }

    public void setCodigoSku(String codigoSku) {
        this.codigoSku = codigoSku;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Double getValorCompra() {
        return valorCompra;
    }

    public void setValorCompra(Double valorCompra) {
        this.valorCompra = valorCompra;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public LocalDate getFechaAdquisicion() {
        return fechaAdquisicion;
    }

    public void setFechaAdquisicion(LocalDate fechaAdquisicion) {
        this.fechaAdquisicion = fechaAdquisicion;
    }

    public Integer getVidaUtilAnios() {
        return vidaUtilAnios;
    }

    public void setVidaUtilAnios(Integer vidaUtilAnios) {
        this.vidaUtilAnios = vidaUtilAnios;
    }

    public Factura getFactura() {
        return factura;
    }

    public void setFactura(Factura factura) {
        this.factura = factura;
    }
}