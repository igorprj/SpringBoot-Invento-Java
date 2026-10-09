package com.project.Invento.services;

import com.project.Invento.dtos.ProductRequestDTO;
import com.project.Invento.dtos.ProductResponseDTO;
import com.project.Invento.models.Product;
import com.project.Invento.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;


    public ProductResponseDTO createProduct(ProductRequestDTO productRequestDTO) {
        Product product = new Product();

        updatedEntity(product, productRequestDTO);

        Product saved =  productRepository.save(product);

        ProductResponseDTO dto = toDTO(saved);

        return dto;
    }

    public List<ProductResponseDTO> getAllProducts() {
        List<Product> products = productRepository.findAll();

        return products.stream()
                .map(this::toDTO)
                .toList();
    }

    public ProductResponseDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        ProductResponseDTO dto = toDTO(product);

        return dto;
    }

    public void deleteProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        productRepository.delete(product);
    }

    public ProductResponseDTO updateProduct(Long id, ProductRequestDTO productRequestDTO) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));


        updatedEntity(product, productRequestDTO);
        productRepository.save(product);

        ProductResponseDTO dto = toDTO(product);

        return dto;
    }

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
