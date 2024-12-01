package edu.neu.csye7374.backend.patterns.singleton;

import edu.neu.csye7374.backend.jpa.repository.CartItemsRepository;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CartConfigurator implements InitializingBean {

    @Autowired
    private CartItemsRepository cartItemsRepository;

    @Override
    public void afterPropertiesSet() {
        Cart.getInstance().setCartItemsRepository(cartItemsRepository);
    }
}