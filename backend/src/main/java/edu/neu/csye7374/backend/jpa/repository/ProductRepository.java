package edu.neu.csye7374.backend.jpa.repository;

import edu.neu.csye7374.backend.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findById(Long id);
    List<Product> findAll();

}
