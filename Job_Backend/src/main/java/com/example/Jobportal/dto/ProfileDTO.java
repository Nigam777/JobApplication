package com.example.Jobportal.dto;

import com.example.Jobportal.entity.Experience;
import com.example.Jobportal.entity.Profile;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class ProfileDTO {
    private Long id;
    private String name;
    private String email;
    private String jobTitle;
    private String company;
    private String location;
    private String about;
    private List<String> skills;
    private List<Experience> experiences;
    private List<Long> savedJobs;




    public Profile toEntity() {
        return new Profile(this.id,this.name, this.email, this.jobTitle, this.company, this.location, this.about, this.skills, this.experiences,this.savedJobs);
    }

}
