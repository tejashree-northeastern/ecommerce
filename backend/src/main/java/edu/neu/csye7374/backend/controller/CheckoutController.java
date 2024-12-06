package edu.neu.csye7374.backend.controller;

import edu.neu.csye7374.backend.patterns.facade.CheckoutFacade;
import edu.neu.csye7374.backend.patterns.singleton.Cart;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/checkout")
public class CheckoutController {
    @Autowired
    private CheckoutFacade checkoutFacade;

    @GetMapping()
    public ResponseEntity<String> completeCheckout() {
        String invoice = checkoutFacade.completeCheckout(Cart.getInstance());
        return ResponseEntity.ok(invoice);
    }
}
