package edu.neu.csye7374.backend.patterns.state;

import edu.neu.csye7374.backend.patterns.observer.Order;

public class ShippedState implements OrderState {
    public void next(Order order) {
        order.setState(new DeliveredState());
        order.setStateType("delivered");
    }

    public void previous(Order order) {
        order.setState(new ProcessingState());
        order.setStateType("processing");
    }

    public void printStatus() {
        System.out.println("Order is shipped.");
    }
}
