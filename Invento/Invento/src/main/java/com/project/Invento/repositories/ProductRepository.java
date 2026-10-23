package com.project.Invento.repositories;

import com.project.Invento.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByName(String name);

    Optional<Product> findBySku(String sku);

    List<Product> findAllByQuantity(int quantity);
}
