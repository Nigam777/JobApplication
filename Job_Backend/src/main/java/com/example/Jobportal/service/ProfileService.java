package com.example.Jobportal.service;

import com.example.Jobportal.dto.ProfileDTO;
import com.example.Jobportal.entity.Profile;
import com.example.Jobportal.exception.JobPortalException;

import java.util.List;

public interface ProfileService  {
    public Long createProfile(String email) throws JobPortalException;
    public ProfileDTO getProfile(Long id) throws JobPortalException;
    public ProfileDTO updateProfile(ProfileDTO profileDTO) throws JobPortalException;
    public ProfileDTO deleteProfile(Long id) throws JobPortalException;

    public List<ProfileDTO> getAllProfiles() throws JobPortalException;
}
