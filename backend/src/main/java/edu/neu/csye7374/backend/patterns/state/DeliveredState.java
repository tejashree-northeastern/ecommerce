package edu.neu.csye7374.backend.patterns.state;

import edu.neu.csye7374.backend.patterns.observer.Order;

public class DeliveredState implements OrderState {
    public void next(Order order) {

        System.out.println("Order has been delivered.");
        order.setStateType("delivered");
    }

    public void previous(Order order) {
        order.setState(new ShippedState());
        order.setStateType("shipped");
    }

    public void printStatus() {
        System.out.println("Order is delivered.");
    }
}
