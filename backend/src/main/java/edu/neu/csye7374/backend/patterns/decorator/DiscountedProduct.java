package com.neu.design.pattern.project.ECommercePlatform.patterns.decorator;

import com.neu.design.pattern.project.ECommercePlatform.models.Product;

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