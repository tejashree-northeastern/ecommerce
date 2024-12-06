package edu.neu.csye7374.backend.patterns.facade;

import edu.neu.csye7374.backend.models.InvoiceFactory;
import edu.neu.csye7374.backend.patterns.builder.OrderBuilder;
import edu.neu.csye7374.backend.patterns.observer.Order;
import edu.neu.csye7374.backend.patterns.singleton.Cart;
import edu.neu.csye7374.backend.patterns.singleton.CartItem;
import edu.neu.csye7374.backend.service.OrderService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class CheckoutFacade {

    @Autowired
    private OrderService orderService;

    @Autowired
    private InvoiceFactory invoiceFactory;

    public String completeCheckout(Cart cart) {
        Order order = orderService.createOrder(cart.getItems());
        JSONObject invoice = invoiceFactory.generateInvoice(order);
        cart.removeAllItems();
        return invoice.toString();
    }
}