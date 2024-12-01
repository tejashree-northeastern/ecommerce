package edu.neu.csye7374.backend.jpa.repository;

import edu.neu.csye7374.backend.patterns.observer.Order;
import edu.neu.csye7374.backend.patterns.singleton.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartItemsRepository extends JpaRepository<CartItem, Long> {
    Optional<CartItem> findById(Long id);

    List<CartItem> findAll();
}
