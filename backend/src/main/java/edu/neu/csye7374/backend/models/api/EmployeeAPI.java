package edu.neu.csye7374.backend.models.api;

public interface EmployeeAPI {

    public double getSalary();

    public String getDesignationTitle();

    public PersonAPI getPerson();

    public SystemUserAPI getUser();
}
