package edu.neu.csye7374.backend.models;

import edu.neu.csye7374.backend.models.api.SystemUserAPI;

public class User implements SystemUserAPI {
    public String userName;
    public String password;
    public int age;
    public String dateOfBirth;
    public int id;
    public String fullName;

    @Override
    public String getFullName() {
        return fullName;
    }

    @Override
    public int getAge() {
        return age;
    }

    @Override
    public String getDateOfBirth() {
        return dateOfBirth;
    }

    @Override
    public String getUsername() {
        return userName;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public int getId() {
        return id;
    }
}
