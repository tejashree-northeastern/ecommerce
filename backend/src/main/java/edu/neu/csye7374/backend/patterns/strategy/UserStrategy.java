package edu.neu.csye7374.backend.patterns.strategy;

import edu.neu.csye7374.backend.jpa.repository.UserRepository;
import edu.neu.csye7374.backend.models.PlatformUser;
import edu.neu.csye7374.backend.patterns.factory.ErrorFactory;

import org.springframework.web.server.ResponseStatusException;

import java.util.function.Consumer;

import java.util.function.Supplier;

public class UserStrategy implements StrategyAPI {

    private UserRepository userRepository;
    private int id;
    private PlatformUser platformUser;

    public UserStrategy(UserRepository userRepository, PlatformUser platformUser) {
        this.userRepository = userRepository;
        this.platformUser = platformUser;
    }

    public UserStrategy(UserRepository userRepository, int id) {
        this.userRepository = userRepository;
        this.id = id;
    }

    @Override
    public void add() {
        userRepository.findByUsername(platformUser.getUsername())
                .ifPresentOrElse(
                        u -> {
                            throw ErrorFactory.createUsernameExistsError(platformUser.getUsername());
                        },
                        this::saveUser);
    }

    @Override
    public void update(int id) {
        PlatformUser platformUserToUpdate = userRepository.findById(id)
                .orElseThrow(userNotFoundErrorSupplier(id));

        updateEntity.accept(platformUserToUpdate);
        userRepository.save(platformUserToUpdate);
    }

    @Override
    public void delete() {
        PlatformUser platformUserToDelete = userRepository.findById(id)
                .orElseThrow(userNotFoundErrorSupplier(id));

        userRepository.delete(platformUserToDelete);
    }

    private void saveUser() {
        userRepository.save(platformUser);
    }

    private Supplier<ResponseStatusException> userNotFoundErrorSupplier(int userId) {
        return () -> ErrorFactory.createUserNotFoundError(userId);
    }

    private Consumer<PlatformUser> updateEntity = userToUpdate -> {
        userToUpdate.setDateOfBirth(platformUser.getDateOfBirth());
        userToUpdate.setUsername(platformUser.getUsername());
        userToUpdate.setPassword(platformUser.getPassword());
    };

}
