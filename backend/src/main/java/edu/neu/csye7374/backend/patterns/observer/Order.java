package com.neu.design.pattern.project.ECommercePlatform.patterns.observer;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.neu.design.pattern.project.ECommercePlatform.patterns.factory.StateFactory;
import com.neu.design.pattern.project.ECommercePlatform.patterns.singleton.CartItem;
import com.neu.design.pattern.project.ECommercePlatform.patterns.state.OrderState;
import com.neu.design.pattern.project.ECommercePlatform.patterns.state.ProcessingState;
import com.neu.design.pattern.project.ECommercePlatform.service.EmailService;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "order_id")
    private List<CartItem> items;

    @Transient
    @JsonIgnore
    private OrderState state;
    @Transient
    private List<OrderObserver> observers;

    public String getStateType() {
        return stateType;
    }

    public void setStateType(String stateType) {
        this.stateType = stateType;
    }

    private String stateType;

    @PostLoad
    private void initializeTransientFields() {
        this.state = StateFactory.getState(this.stateType);
        this.observers = new ArrayList<>();
        observers.add(new CustomerNotificationService(new EmailService()));
    }

    public Order() {
        this.state = new ProcessingState();
        this.items = new ArrayList<>();
        this.observers = new ArrayList<>();
        this.stateType = "processing";
        observers.add(new CustomerNotificationService(new EmailService()));
    }
    public Order(List<CartItem> items) {
        this.state = new ProcessingState();
        this.items = items;
        this.observers = new ArrayList<>();
        this.stateType = "processing";
        observers.add(new CustomerNotificationService(new EmailService()));
    }
    public void setState(OrderState state) {
        this.state = state;
    }

    public void next() {
        state.next(this);
    }

    public void previous() {
        state.previous(this);
    }

    public void printStatus() {
        state.printStatus();
    }

    public void addObserver(OrderObserver observer) {
        observers.add(observer);
    }

    public void placeOrder() {
        observers.forEach(observer -> observer.update(this));
        next();

    }

    public List<CartItem> getItems()
    {
        return items;
    }

    public Long getId() {
        return id;
    }

    public OrderState getState() {
        return state;
    }
}
