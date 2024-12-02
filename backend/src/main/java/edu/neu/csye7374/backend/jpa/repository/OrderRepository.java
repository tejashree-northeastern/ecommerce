package edu.neu.csye7374.backend.jpa.repository;

import com.neu.design.pattern.project.ECommercePlatform.patterns.observer.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {

    Optional<Order> findById(Long id);

    List<Order> findAll();
}
