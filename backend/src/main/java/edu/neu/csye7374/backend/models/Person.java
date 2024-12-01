package edu.neu.csye7374.backend.models;

import com.neu.design.pattern.project.ECommercePlatform.models.api.PersonAPI;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;


@Entity
public class Person implements PersonAPI {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String fullName;
    private int age;

    private String dateOfBirth;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Override
    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    @Override
    public int getAge() {
        return age;
    }

    @Override
    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setDateOfBirth(String dateOfBirth)
    {
        this.dateOfBirth = dateOfBirth;
    }

}
