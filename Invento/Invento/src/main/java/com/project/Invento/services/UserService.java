package com.project.Invento.services;

import com.project.Invento.dtos.ProductRequestDTO;
import com.project.Invento.dtos.ProductResponseDTO;
import com.project.Invento.models.Product;
import com.project.Invento.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;



    private void updatedEntity(Product product, ProductRequestDTO productRequestDTO) {
        product.setName(productRequestDTO.name());
        product.setSku(productRequestDTO.sku());
        product.setDescription(productRequestDTO.description());
        product.setCostPrice(productRequestDTO.costPrice());
        product.setSalePrice(productRequestDTO.salePrice());
        product.setQuantity(productRequestDTO.quantity());
        product.setMinimumStock(productRequestDTO.minimumStock());
        product.setMaximumStock(productRequestDTO.maximumStock());
    }

    private ProductResponseDTO toDTO(Product product){
        ProductResponseDTO dto = new ProductResponseDTO(
                product.getId(),
                product.getName(),
                product.getSku(),
                product.getDescription(),
                product.getCostPrice(),
                product.getSalePrice(),
                product.getQuantity(),
                product.getMinimumStock(),
                product.getMaximumStock(),
                product.isActive()
        );

        return dto;
    }
}
