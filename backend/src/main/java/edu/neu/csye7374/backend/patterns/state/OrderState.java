package edu.neu.csye7374.backend.patterns.state;

import edu.neu.csye7374.backend.patterns.observer.Order;

public interface OrderState {
    void next(Order order);

    void previous(Order order);

    void printStatus();
}
