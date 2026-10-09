package com.project.Invento.dtos;

import java.math.BigDecimal;

public record ProductRequestDTO(
        String name,
        String sku,
        String description,
        BigDecimal costPrice,
        BigDecimal salePrice,
        int quantity,
        int minimumStock,
        int maximumStock,
        boolean active
) {
}
