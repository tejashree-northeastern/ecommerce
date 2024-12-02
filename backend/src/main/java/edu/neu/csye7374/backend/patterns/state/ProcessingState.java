package com.neu.design.pattern.project.ECommercePlatform.patterns.state;

import com.neu.design.pattern.project.ECommercePlatform.patterns.observer.Order;

public class ProcessingState implements OrderState {
    @Override
    public void next(Order order) {
        order.setState(new ShippedState());
        order.setStateType("shipped");
    }

    @Override
    public void previous(Order order) {
        System.out.println("The order is in the initial state.");
    }

    public void printStatus() {
        System.out.println("Order is being processed.");
    }
}
