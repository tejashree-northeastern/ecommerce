package com.neu.design.pattern.project.ECommercePlatform.controller;


import com.neu.design.pattern.project.ECommercePlatform.jpa.repository.UserRepository;
import com.neu.design.pattern.project.ECommercePlatform.models.PlatformUser;
import com.neu.design.pattern.project.ECommercePlatform.service.LoginService;
import com.neu.design.pattern.project.ECommercePlatform.service.UserManagementService;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/user")
public class UserController {

    @Autowired
    UserManagementService userManagementService;

    @Autowired
    LoginService loginService;

    @GetMapping("/getAll")
    public List<PlatformUser> getAllUsers() {

        return userManagementService.getAll();
    }

    @GetMapping("/{id}")
    public PlatformUser getUsedByID(@PathVariable int id) {
        return userManagementService.getUser(id);
    }

    @PutMapping("/{id}")
    public void update(@RequestBody PlatformUser platformUser, @PathVariable int id) {
       userManagementService.update(platformUser, id);
    }

    @DeleteMapping("/{id}")
    public void deletebyId(@PathVariable int id) {
        userManagementService.deletebyID(id);
    }

    @PostMapping("/create")
    public void createNewUser(@RequestBody PlatformUser platformUser) {
       userManagementService.save(platformUser);
    }

    @PostMapping("/login")
    public PlatformUser login(@RequestBody JSONObject creds) {
     return   loginService.login(creds);
    }

}
