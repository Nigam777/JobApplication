package com.example.Jobportal.service;

import com.example.Jobportal.dto.ApplicantDTO;
import com.example.Jobportal.dto.Application;
import com.example.Jobportal.dto.ApplicationStatus;
import com.example.Jobportal.dto.JobDTO;
import com.example.Jobportal.entity.Applicants;
import com.example.Jobportal.entity.Job;
import com.example.Jobportal.exception.JobPortalException;
import com.example.Jobportal.repository.JobRepo;
import com.example.Jobportal.utility.Utilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class JobServiceImpl implements JobService {
    @Autowired
    private JobRepo jobRepo;
    @Autowired
    private Utilities utilities;

    @Override
    public JobDTO postJob(JobDTO jobDTO) throws JobPortalException {
        jobDTO.setId(utilities.getNextSequence("jobs"));
        jobDTO.setPostTime(LocalDateTime.now());
        return jobRepo.save(jobDTO.toEntity()).toDTO();
    }

    @Override
    public List<JobDTO> getAllJobs() {
        return jobRepo.findAll().stream().map((x) -> x.toDTO()).toList();

    }

    @Override
    public JobDTO getJob(Long id) throws JobPortalException {
        return jobRepo.findById(id).orElseThrow(() -> new JobPortalException("JOB_NOT_FOUND")).toDTO();
    }

    @Override
    public void applyJob(Long id, ApplicantDTO applicantDTO) throws JobPortalException {
        Job job = jobRepo.findById(id).orElseThrow(() -> new JobPortalException("JOB_NOT_FOUND"));
        List<Applicants> applicants = job.getApplicants();
        if (applicants == null) {
            applicants = new ArrayList<>();
        }
        if (applicants.stream()
                .anyMatch(x -> x.getApplicantId().equals(applicantDTO.getApplicantId()))) {
            throw new JobPortalException("ALREADY_APPLIED");
        }

        applicantDTO.setApplicationStatus(ApplicationStatus.APPLIED);
        Applicants applicantEntity = applicantDTO.toEntity();

        applicants.add(applicantEntity);
        job.setApplicants(applicants);
        jobRepo.save(job);


    }

    @Override
    public List<JobDTO> postByJob(Long id) {
        return jobRepo.findByPostBy(id).stream().map((x) -> x.toDTO()).toList();
    }

    @Override
    public void changeAppliedStatus(Application application) {
        Job job = jobRepo.findById(application.getId()).orElseThrow(() -> new JobPortalException("JOB_NOT_FOUND"));
        List<Applicants> applicants = job.getApplicants().stream().map((x) -> {
            if (x.getApplicantId().equals(application.getApplicantId()))
            {
                x.setApplicationStatus(application.getApplicationStatus());

                if (application.getApplicationStatus().equals(ApplicationStatus.INTERVIEWING))
                    x.setInterviewTime(application.getInterviewTime());
            }
            return x;
        }).toList();
        job.setApplicants(applicants);
        jobRepo.save(job);


    }
}































