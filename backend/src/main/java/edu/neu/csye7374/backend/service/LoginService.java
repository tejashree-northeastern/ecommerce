package edu.neu.csye7374.backend.service;

import edu.neu.csye7374.backend.jpa.repository.UserRepository;
import edu.neu.csye7374.backend.models.PlatformUser;
import edu.neu.csye7374.backend.patterns.factory.ErrorFactory;
import edu.neu.csye7374.backend.suppliers.StringSuppliers;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.function.Supplier;

@Component
public class LoginService {

    @Autowired
    private UserRepository userRepository;

    public PlatformUser login(JSONObject creds) {
        String username = creds.getAsString(StringSuppliers.USERNAME.get());
        String password = creds.getAsString(StringSuppliers.PASSWORD.get());
        return userRepository.findByUsernameAndPassword(username, password)
                .orElseThrow(userNotFoundSupplier());
    }

    private Supplier<ResponseStatusException> userNotFoundSupplier() {
        return ErrorFactory::createPasswordOrUserNameIncorrect;
    }
}