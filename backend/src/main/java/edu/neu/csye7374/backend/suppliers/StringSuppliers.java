package edu.neu.csye7374.backend.suppliers;

import java.util.function.Supplier;

public class StringSuppliers {

    public static Supplier<String> USER_ALREADY_EXISTS = ()->"Username '%s' already exists";

    public static Supplier<String> USER_DOES_NOT_EXISTS = () -> "User with ID %d does not exist";

    public static Supplier<String> USER_DOES_NOT_EXISTS_WITHOUT_ID = () -> "User does not exist";

    public static Supplier<String> USERNAME = () -> "username";
    public static Supplier<String> PASSWORD = () -> "password";

    public static Supplier<String> USERNAME_AND_PASS_INCORRECT = () -> "Username/Password is incorrect";


}

