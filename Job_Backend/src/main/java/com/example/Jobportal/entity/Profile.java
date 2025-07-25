package com.example.Jobportal.entity;

import com.example.Jobportal.dto.ProfileDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "Profile")
@AllArgsConstructor
@NoArgsConstructor
public class Profile {
    @Id
    private Long id;
    private String name;
    private String email;
    private String jobTitle;
    private String company;
    private String location;
    private String about;
    private List<String> skills;
    private List<Experience> experiences;
    private List<Long>savedJobs;



    public ProfileDTO toDTO() {
        return new ProfileDTO(this.id,this.name, this.email, this.jobTitle, this.company, this.location, this.about, this.skills, this.experiences,this.savedJobs);
    }
}



