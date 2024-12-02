package edu.neu.csye7374.backend.patterns.decorator;

import edu.neu.csye7374.backend.models.Product;

public abstract class ProductDecorator extends Product {
    protected Product product;

    public ProductDecorator(Product product) {
        super(product.getName(), product.getPrice(), product.getStockQuantity());
        this.product = product;
    }

    @Override
    public double getPrice() {
        return product.getPrice();
    }
}
