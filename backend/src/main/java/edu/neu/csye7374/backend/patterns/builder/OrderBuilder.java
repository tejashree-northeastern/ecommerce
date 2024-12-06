package edu.neu.csye7374.backend.patterns.builder;

import edu.neu.csye7374.backend.patterns.observer.Order;
import edu.neu.csye7374.backend.patterns.singleton.CartItem;

import java.util.ArrayList;
import java.util.List;

public class OrderBuilder {
    private List<CartItem> items = new ArrayList<>();

    public OrderBuilder addItem(CartItem item) {
        items.add(item);
        return this;
    }
    public OrderBuilder addItem(List<CartItem> item) {
       items = item;
        return this;
    }


    public Order build() {
        if (items.isEmpty()) {
            throw new IllegalStateException("Order cannot be empty");
        }
        return new Order(items);
    }
}
