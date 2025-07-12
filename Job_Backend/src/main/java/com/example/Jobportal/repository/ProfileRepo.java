package com.example.Jobportal.repository;
import com.example.Jobportal.entity.Profile;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProfileRepo extends MongoRepository<Profile, Long> {

}
