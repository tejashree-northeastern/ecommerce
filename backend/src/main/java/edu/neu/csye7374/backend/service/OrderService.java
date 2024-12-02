package edu.neu.csye7374.backend.service;

import edu.neu.csye7374.backend.jpa.repository.OrderRepository;
import edu.neu.csye7374.backend.patterns.builder.OrderBuilder;
import edu.neu.csye7374.backend.patterns.observer.Order;
import edu.neu.csye7374.backend.patterns.singleton.CartItem;
import edu.neu.csye7374.backend.patterns.state.OrderState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public Order createOrder(List<CartItem> items) {
        Order order = new OrderBuilder().addItem(items).build();
        order.placeOrder();
        return orderRepository.save(order);
    }

    public Order findOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
    }

    public List<Order> getAllOrders(){
        return orderRepository.findAll();
    }

    public Order updateOrderState(Long id, OrderState state) {
        Order order = findOrderById(id);
        order.setState(state);
        return orderRepository.save(order);
    }

    public Order moveOrderToNextState(Long id) {
        Order order = findOrderById(id);
        order.next();
        return orderRepository.save(order);
    }

    public Order moveOrderToPreviousState(Long id) {
        Order order = findOrderById(id);
        order.previous();
        return orderRepository.save(order);
    }
}
