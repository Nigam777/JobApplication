package com.example.Jobportal.entity;

import java.time.LocalDateTime;
import java.util.List;

import com.example.Jobportal.dto.ApplicantDTO;
import com.example.Jobportal.dto.JobDTO;
import com.example.Jobportal.dto.JobStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "Job")
public class Job {
    private Long id;
    private String jobTitle;
    private String company;
    private List<Applicants> applicants;
    private String about;
    private String experience;
    private String jobType;
    private String location;
    private Long packageOffered;
    private LocalDateTime postTime;
    private String description;
    private List<String> skillsRequired;
    private JobStatus jobStatus;
    private Long postBy;

    public JobDTO toDTO() {
        List<ApplicantDTO> applicantDTOs = this.applicants != null
                ? this.applicants.stream().map((x) -> x.toDTO()).toList()
                : null;

        return new JobDTO(this.id, this.jobTitle, this.company, applicantDTOs, this.about, this.experience,
                this.jobType, this.location, this.packageOffered, this.postTime, this.description,
                this.skillsRequired, this.jobStatus,this.postBy);
    }

}


