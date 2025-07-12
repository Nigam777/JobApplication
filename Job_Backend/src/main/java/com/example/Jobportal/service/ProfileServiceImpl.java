package com.example.Jobportal.service;

import com.example.Jobportal.dto.ProfileDTO;
import com.example.Jobportal.entity.Profile;
import com.example.Jobportal.exception.JobPortalException;
import com.example.Jobportal.repository.ProfileRepo;
import com.example.Jobportal.utility.Utilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("ProfileService")
public class ProfileServiceImpl implements ProfileService {

    @Autowired
    private Utilities utilities;
    @Autowired
    private ProfileRepo profileRepo;

    @Override
    public Long createProfile(String email) throws JobPortalException {
        Profile profile = new Profile();
        profile.setId(utilities.getNextSequence("profile"));
        profile.setEmail(email);
        profile.setSkills(new ArrayList<>());
        profile.setExperiences(new ArrayList<>());
        profile.setSavedJobs(new ArrayList<>());
        Profile savedProfile = profileRepo.save(profile);
        System.out.println("Saved Profile: " + savedProfile);
        return savedProfile.getId();

    }

    @Override
    public ProfileDTO getProfile(Long id) throws JobPortalException {
        return profileRepo.findById(id).orElseThrow(() -> new JobPortalException("PROFILE_NOT_FOUND")).toDTO();

    }

    @Override
    public ProfileDTO updateProfile(ProfileDTO profileDTO) throws JobPortalException {
        profileRepo.findById(profileDTO.getId()).orElseThrow(() -> new JobPortalException("PROFILE_NOT_FOUND"));
        profileRepo.save(profileDTO.toEntity());
        return profileDTO;
    }

    @Override
    public ProfileDTO deleteProfile(Long id) throws JobPortalException {
        profileRepo.findById(id).orElseThrow(() -> new JobPortalException("PROFILE_NOT_FOUND"));
        profileRepo.deleteById(id);
        return new ProfileDTO();
    }

    @Override
    public List<ProfileDTO> getAllProfiles() {
        List<Profile> profiles = profileRepo.findAll();
        List<ProfileDTO> profileDTOs = new ArrayList<>();
        for (Profile profile : profiles) {
            profileDTOs.add(profile.toDTO());
        }
        return profileDTOs;
    }


}
