package edu.neu.csye7374.backend.patterns.decorator;

import edu.neu.csye7374.backend.models.Product;

public class DiscountedProduct extends ProductDecorator {
    private double discountRate;

    public DiscountedProduct(Product product, double discountRate) {
        super(product);
        this.discountRate = discountRate;
    }

    @Override
    public double getPrice() {
        return super.getPrice() * (1 - discountRate);
    }
}