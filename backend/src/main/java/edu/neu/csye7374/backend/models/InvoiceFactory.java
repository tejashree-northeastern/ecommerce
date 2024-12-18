package edu.neu.csye7374.backend.models;

import java.util.Date;

import org.json.JSONArray;
import org.json.JSONObject;

import edu.neu.csye7374.backend.patterns.observer.Order;
import edu.neu.csye7374.backend.patterns.singleton.CartItem;

public class InvoiceFactory {
    public static JSONObject generateInvoice(Order order) {
        JSONObject invoiceJson = new JSONObject();
        JSONArray itemsArray = new JSONArray();

        invoiceJson.put("Invoice Date", new Date().toString());
        invoiceJson.put("Order ID", order.getId());

        for (CartItem item : order.getItems()) {
            JSONObject itemJson = new JSONObject();
            itemJson.put("Product Name", item.getProduct().getName());
            itemJson.put("Quantity", item.getQuantity());
            itemJson.put("Price", item.getProduct().getPrice() * item.getQuantity());
            itemsArray.put(itemJson);
        }

        invoiceJson.put("Items", itemsArray);
        return invoiceJson;
    }
}
