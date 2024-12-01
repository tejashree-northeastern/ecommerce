package edu.neu.csye7374.backend.models;

import com.neu.design.pattern.project.ECommercePlatform.models.api.PersonAPI;
import com.neu.design.pattern.project.ECommercePlatform.models.api.SystemUserAPI;
import jakarta.persistence.*;
import lombok.Data;

@Entity
public class PlatformUser implements SystemUserAPI {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int id;
    public String username;
    public String password;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "person_id")
    private Person person;


    @Override
    public String getFullName() {
        return person.getFullName();
    }

    @Override
    public int getAge() {
        return person.getAge();
    }

    @Override
    public String getDateOfBirth() {
        return person.getDateOfBirth();
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setAge(int age) {
        this.person.setAge(age);
    }
    public void setPerson(Person person)
    {
        this.person = person;
    }

    public void setFullName(String fullName) {
        this.person.setFullName( fullName);
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.person.setDateOfBirth(dateOfBirth);
    }
}
