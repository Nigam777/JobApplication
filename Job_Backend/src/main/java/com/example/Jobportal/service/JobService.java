package com.example.Jobportal.service;

import com.example.Jobportal.dto.ApplicantDTO;
import com.example.Jobportal.dto.Application;
import com.example.Jobportal.dto.JobDTO;

import java.util.List;

public interface JobService  {
    public  JobDTO postJob(JobDTO jobDTO);

    public JobDTO getJob(Long id);

    public List<JobDTO> getAllJobs();

    public void  applyJob(Long id, ApplicantDTO applicantDTO);

    public List<JobDTO> postByJob(Long id);

    public  void changeAppliedStatus(Application application);


    // Define any additional methods you want to implement in the service layer
    // For example, you can add methods for custom queries or business logic
    // that are not provided by the JobRepo interface.
}
