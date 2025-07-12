package com.example.Jobportal.api;

import com.example.Jobportal.dto.ProfileDTO;
import com.example.Jobportal.exception.JobPortalException;
import com.example.Jobportal.service.ProfileService;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
@Validated
@Log
@RequestMapping("/profile")
public class ProfileApi {

    @Autowired
    private ProfileService profileService;

    @GetMapping("/get/{id}")
    public ResponseEntity<ProfileDTO> getProfile(@PathVariable Long id) throws JobPortalException {
        ProfileDTO profileDTO = profileService.getProfile(id);
        return new ResponseEntity<>(profileDTO, HttpStatus.OK);
    }
    @PutMapping("/update")
    public ResponseEntity<ProfileDTO> updateProfile(@RequestBody ProfileDTO profileDTO) throws JobPortalException {
        log.info("Updating profile: " + profileDTO);
        ProfileDTO updatedProfile = profileService.updateProfile(profileDTO);
        log.info("Updated profile: " + updatedProfile);

        return new ResponseEntity<>(updatedProfile, HttpStatus.OK);
    }
    @GetMapping("/getAllProfiles")
    public ResponseEntity<List<ProfileDTO>> getAllProfiles() throws JobPortalException {
        List<ProfileDTO>  profileDTO = profileService.getAllProfiles();
        return new ResponseEntity<>(profileDTO, HttpStatus.OK);
    }
}






















