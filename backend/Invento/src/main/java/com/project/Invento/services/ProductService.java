package com.project.Invento.services;

import com.project.Invento.dtos.ProductRequestDTO;
import com.project.Invento.dtos.ProductResponseDTO;
import com.project.Invento.exceptions.ProductNotFoundException;
import com.project.Invento.models.Product;
import com.project.Invento.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;

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
                .orElseThrow(() -> new ProductNotFoundException("Product not found"));

        ProductResponseDTO dto = toDTO(product);

        return dto;
    }

    public void deleteProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product not found"));

        productRepository.delete(product);
    }

    public ProductResponseDTO updateProduct(Long id, ProductRequestDTO productRequestDTO) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product not found"));


        updatedEntity(product, productRequestDTO);
        productRepository.save(product);

        ProductResponseDTO dto = toDTO(product);

        return dto;
    }

    public ProductResponseDTO getProductsByName(String name) {
        Product product = productRepository.findByName(name)
                .orElseThrow(() -> new ProductNotFoundException("Product not found"));


        return toDTO(product);
    }

    public ProductResponseDTO getProductsBySku(String sku) {
        Product product = productRepository.findBySku(sku)
                .orElseThrow(() -> new ProductNotFoundException("Product not found"));


        return toDTO(product);
    }

    public List<ProductResponseDTO> getProductsByQuantity(int quantity) {
        return productRepository.findAllByQuantity(quantity)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public byte[] exportCSV() {
        List<Product> product = productRepository.findAll();

        StringBuilder csv = new StringBuilder();

        for (Product p : product) {
            csv.append(escapeCSV(p.getName()));
            csv.append(";");
            csv.append(escapeCSV(p.getSku()));
            csv.append(";");
            csv.append(p.getDescription());
            csv.append(";");
            csv.append(p.getCostPrice());
            csv.append(";");
            csv.append(p.getSalePrice());
            csv.append(";");
            csv.append(p.getQuantity());
            csv.append(";");
            csv.append(p.getMinimumStock());
            csv.append(";");
            csv.append(p.getMaximumStock());
        }

        return csv.toString().getBytes(StandardCharsets.UTF_8);
    }

    public void importCSV(MultipartFile file) {
        try {
            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8)
            );

            String line;

            while ((line = reader.readLine()) != null) {
                String[] data = line.split(";");

                for(String column : data){
                    System.out.println(column);
                }

                String name = data[0];
                String sku = data[1];

                BigDecimal costPrice = new BigDecimal(data[2]);
                BigDecimal salePrice = new BigDecimal(data[3]);

                Integer quantity = Integer.parseInt(data[4]);
                Integer minimumStock = Integer.parseInt(data[5]);
                Integer maximumStock = Integer.parseInt(data[6]);

                Product product = new Product();

                product.setName(name);
                product.setSku(sku);
                product.setCostPrice(costPrice);
                product.setSalePrice(salePrice);
                product.setQuantity(quantity);
                product.setMinimumStock(minimumStock);
                product.setMaximumStock(maximumStock);

                Optional<Product> optional = productRepository.findBySku(product.getSku());

                if (optional.isPresent()) {
                    Product existingProduct = optional.get();
                    existingProduct.setQuantity(product.getQuantity());
                    existingProduct.setMinimumStock(product.getMinimumStock());
                    existingProduct.setMaximumStock(product.getMaximumStock());
                    existingProduct.setSalePrice(product.getSalePrice());
                    existingProduct.setName(product.getName());
                    existingProduct.setCostPrice(product.getCostPrice());

                    productRepository.save(existingProduct);
                } else {
                    productRepository.save(product);
                }
            }



        } catch (IOException ex) {
            throw new RuntimeException("Erro ao ler o arquivo CSV", ex);
        }
    }

    private String escapeCSV(String value) {
        if (value == null) {
            return "";
        }

        if (value.contains(";") || value.contains("\"")
                || value.contains("\n") || value.contains("\r")) {

            value = value.replace("\"", "\"\"");
            return "\"" + value + "\"";
        }

        return value;
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
