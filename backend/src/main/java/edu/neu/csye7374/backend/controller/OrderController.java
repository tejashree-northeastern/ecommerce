package edu.neu.csye7374.backend.controller;

import edu.neu.csye7374.backend.patterns.observer.Order;
import edu.neu.csye7374.backend.patterns.singleton.CartItem;
import edu.neu.csye7374.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping()
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    @PostMapping("/place")
    public ResponseEntity<Order> placeOrder(@RequestBody List<CartItem> items) {
        Order order = new Order(items);
        order.placeOrder();
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        Order order = orderService.findOrderById(id);
        return ResponseEntity.ok(order);
    }

    @PostMapping("/next/{id}")
    public ResponseEntity<Order> moveOrderToNextState(@PathVariable Long id) {
        Order order = orderService.moveOrderToNextState(id);
        return ResponseEntity.ok(order);
    }

    @PostMapping("/prev/{id}")
    public ResponseEntity<Order> moveOrderToPreviousState(@PathVariable Long id) {
        Order order = orderService.moveOrderToPreviousState(id);
        return ResponseEntity.ok(order);
    }
}

