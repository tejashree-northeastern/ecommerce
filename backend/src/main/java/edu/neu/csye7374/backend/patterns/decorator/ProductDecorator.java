package com.neu.design.pattern.project.ECommercePlatform.patterns.decorator;

import com.neu.design.pattern.project.ECommercePlatform.models.Product;

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
