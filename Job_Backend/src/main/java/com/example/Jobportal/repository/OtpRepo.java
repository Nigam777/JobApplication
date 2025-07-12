package com.example.Jobportal.repository;

import com.example.Jobportal.entity.Otp;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface OtpRepo extends MongoRepository<Otp,String> {
   List<Otp> findByCreationTimeBefore(LocalDateTime expirationTime);

}
