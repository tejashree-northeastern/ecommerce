package edu.neu.csye7374.backend.jpa.repository;

import edu.neu.csye7374.backend.models.PlatformUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional
public interface UserRepository extends JpaRepository<PlatformUser, Integer> {

    Optional<PlatformUser> findById(int id);

    Optional<PlatformUser> findByUsername(String userName);

    Optional<PlatformUser> findByUsernameAndPassword(String username, String password);

}
