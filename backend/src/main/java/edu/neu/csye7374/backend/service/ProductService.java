package edu.neu.csye7374.backend.service;

import edu.neu.csye7374.backend.jpa.repository.*;
import edu.neu.csye7374.backend.models.*;
import edu.neu.csye7374.backend.patterns.decorator.DiscountedProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Product applyDiscount(Long id, double discountRate) {
        Product product = findProductById(id);
        Product discountedProduct = new DiscountedProduct(product, discountRate);
        return productRepository.save(discountedProduct);
    }

    public List<Product> findAllProducts() {
        return productRepository.findAll();
    }

    public Product findProductById(Long id) {
        Optional<Product> product = productRepository.findById(id);
        return product.orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product productDetails) {
        Product product = findProductById(id);
        product.setName(productDetails.getName());
        product.setPrice(productDetails.getPrice());
        product.setStockQuantity(productDetails.getStockQuantity());
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        Product product = findProductById(id);
        productRepository.delete(product);
    }
}
