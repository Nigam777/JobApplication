package com.example.Jobportal.dto;

import com.example.Jobportal.entity.Applicants;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApplicantDTO {
    @JsonProperty("id")
    private Long applicantId;
    private String name;
    private String email;
    private Long phone;
    private String website;
    private String resume;
    private String coverletter;
    private LocalDateTime timestamp;
    private ApplicationStatus applicationStatus;
    private LocalDateTime interviewTime;

    public Applicants toEntity() {
        return new Applicants(this.applicantId, this.name, this.email, this.phone, this.website, this.resume, this.coverletter, this.timestamp, this.applicationStatus, this.interviewTime);
    }
}
