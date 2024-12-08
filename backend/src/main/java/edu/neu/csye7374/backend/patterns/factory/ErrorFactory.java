package edu.neu.csye7374.backend.patterns.factory;

import edu.neu.csye7374.backend.suppliers.StringSuppliers;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class ErrorFactory {


    public static ResponseStatusException createUsernameExistsError(String username) {
        return new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                String.format(StringSuppliers.USER_ALREADY_EXISTS.get(), username)
        );
    }

    public static ResponseStatusException createUserNotFoundError(int id) {
        return new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                String.format(StringSuppliers.USER_DOES_NOT_EXISTS.get(), id)
        );
    }

    public static ResponseStatusException createPasswordOrUserNameIncorrect() {
        return new ResponseStatusException(HttpStatus.BAD_REQUEST, StringSuppliers.USERNAME_AND_PASS_INCORRECT.get());
    }
}

