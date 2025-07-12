package com.example.Jobportal.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class Application {

    private Long id;
    private Long ApplicantId;
    private LocalDateTime interviewTime;
    private ApplicationStatus applicationStatus;

}
