package com.project.Invento.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@Table(name = "products")
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "O nome é obrigatório")
    private String name;
    @NotBlank(message = "O sku é obrigatório")
    private String sku;
    private String description;
    @NotNull(message = "O preço de custo é obrigatório")
    @DecimalMin(value = "0.0", inclusive = false, message = "O preço de custo deve ser maior que zero")
    private BigDecimal costPrice;
    @NotNull(message = "O preço de venda é obrigatório")
    @DecimalMin(value = "0.0", inclusive = false, message = "O preço de venda deve ser maior que zero")
    private BigDecimal salePrice;
    @PositiveOrZero(message = "A quantidade não pode ser negativa")
    private int quantity;
    @PositiveOrZero(message = "O estoque mínimo não pode ser negativo")
    private int minimumStock;
    @PositiveOrZero(message = "O estoque máximo não pode ser negativo")
    private int maximumStock;
    private boolean active = true;
}
