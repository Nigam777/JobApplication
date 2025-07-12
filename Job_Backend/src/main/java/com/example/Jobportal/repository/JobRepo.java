package com.example.Jobportal.repository;
import com.example.Jobportal.entity.Job;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface JobRepo extends MongoRepository<Job, Long> {
    public List<Job> findByPostBy(Long postBy);


}
