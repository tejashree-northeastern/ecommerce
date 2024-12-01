package edu.neu.csye7374.backend.models.api;

public interface SystemUserAPI extends PersonAPI{

    public String getUsername();
    public String getPassword();
    public int getId();
}
