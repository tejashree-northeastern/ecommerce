package edu.neu.csye7374.backend.controller;

import edu.neu.csye7374.backend.models.Product;
import edu.neu.csye7374.backend.patterns.singleton.Cart;
import edu.neu.csye7374.backend.patterns.singleton.CartItem;
import edu.neu.csye7374.backend.service.CartService;
import edu.neu.csye7374.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/v1/cart")
public class CartController {

    @Autowired
    CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<Cart> addItemToCart(@RequestBody CartItem item) {
        Cart cart = Cart.getInstance();
        cart.addItem(item);
        return ResponseEntity.ok(cart);
    }

    @PostMapping("/add/{productId}")
    public ResponseEntity<Cart> addItemToCartById(@PathVariable Long productId) {
        Cart cart = cartService.addItemToCardById(productId);
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/remove")
    public ResponseEntity<Cart> removeItemFromCart(@RequestBody CartItem item) {
        Cart cart = Cart.getInstance();
        cart.removeItem(item);
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<Cart> removeItemFromCartById(@PathVariable Long productId) {
        Cart cart = cartService.removeItemFromCartById(productId);
        return ResponseEntity.ok(cart);
    }

    @GetMapping
    public ResponseEntity<List<CartItem>> getCartItems() {
        Cart cart = Cart.getInstance();
        return ResponseEntity.ok(cart.getItems());
    }
}
