package com.example.Jobportal.entity;

import com.example.Jobportal.dto.ApplicantDTO;
import com.example.Jobportal.dto.ApplicationStatus;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Applicants {
    @JsonProperty("id")
    private Long applicantId;
    private String fullName;
    private String email;
    private Long mobileNo;
    private String personalWebsite;
    private String resume;
    private String coverLetter;
    private LocalDateTime timestamp;
    private ApplicationStatus applicationStatus;
    private LocalDateTime interviewTime;




    public ApplicantDTO toDTO() {
    return new ApplicantDTO(this.applicantId, this.fullName, this.email, this.mobileNo, this.personalWebsite, this.resume, this.coverLetter, this.timestamp, this.applicationStatus,this.interviewTime);
    }
}

