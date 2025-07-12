package com.example.Jobportal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class JobHuntApplication {
	public static void main(String[] args) {
		SpringApplication.run(JobHuntApplication.class, args);
	}
}
