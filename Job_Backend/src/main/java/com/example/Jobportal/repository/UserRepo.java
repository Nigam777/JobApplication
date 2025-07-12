package com.example.Jobportal.repository;

import com.example.Jobportal.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepo extends MongoRepository <User, Long> {
    public Optional<User> findByEmail(String email);
}
