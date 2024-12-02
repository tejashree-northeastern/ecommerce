package com.neu.design.pattern.project.ECommercePlatform.patterns.state;

import com.neu.design.pattern.project.ECommercePlatform.patterns.observer.Order;

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
