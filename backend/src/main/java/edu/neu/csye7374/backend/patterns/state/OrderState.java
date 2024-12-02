package com.neu.design.pattern.project.ECommercePlatform.patterns.state;

import com.neu.design.pattern.project.ECommercePlatform.patterns.observer.Order;

public interface OrderState {
    void next(Order order);
    void previous(Order order);
    void printStatus();
}

