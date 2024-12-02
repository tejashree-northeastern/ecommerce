package com.neu.design.pattern.project.ECommercePlatform.service;

import com.neu.design.pattern.project.ECommercePlatform.jpa.repository.UserRepository;
import com.neu.design.pattern.project.ECommercePlatform.models.PlatformUser;
import com.neu.design.pattern.project.ECommercePlatform.patterns.strategy.StrategyAPI;
import com.neu.design.pattern.project.ECommercePlatform.patterns.strategy.UserStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserManagementService {

    @Autowired
    UserRepository userRepository;

    public List<PlatformUser> getAll() {
        return userRepository.findAll();
    }

    public PlatformUser getUser(int id) {
        return userRepository.findById(id).get();
    }

    public void update(PlatformUser platformUser, int id) {
        StrategyAPI strategy = new UserStrategy(userRepository, platformUser);
        strategy.update(id);
    }

    public void deletebyID( int id) {
        StrategyAPI strategy = new UserStrategy(userRepository, id);
        strategy.delete();
    }

    public void save( PlatformUser employee) {
        StrategyAPI strategyAPI = new UserStrategy(userRepository, employee);
        strategyAPI.add();
    }



}
