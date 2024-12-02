package edu.neu.csye7374.backend.service;

import edu.neu.csye7374.backend.models.Product;
import edu.neu.csye7374.backend.patterns.singleton.Cart;
import edu.neu.csye7374.backend.patterns.singleton.CartItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartService {

    @Autowired
    ProductService productService;

    public Cart getCart() {
        return Cart.getInstance();
    }

    public void addItemToCart(CartItem item) {
        Cart cart = Cart.getInstance();
        cart.addItem(item);
    }

    public void removeItemFromCart(CartItem item) {
        Cart cart = Cart.getInstance();
        cart.removeItem(item);
    }

    public Cart addItemToCardById(Long id) {
        Product product = productService.findProductById(id);
        CartItem item = new CartItem(product, 1);
        Cart cart = Cart.getInstance();
        cart.addItem(item);
        return cart;
    }

    public Cart removeItemFromCartById(Long productId) {
        Iterator<CartItem> iterator = getCart().getItems().iterator();
        while (iterator.hasNext()) {
            CartItem item = iterator.next();
            if (item.getProduct().getId().equals(productId)) {
                iterator.remove();
                break;
            }
        }
        return getCart();
    }
}
