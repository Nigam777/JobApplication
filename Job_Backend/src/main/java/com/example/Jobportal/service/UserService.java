package com.example.Jobportal.service;

import com.example.Jobportal.dto.LoginDTO;
import com.example.Jobportal.dto.ResponseDTO;
import com.example.Jobportal.dto.UserDTO;
import com.example.Jobportal.exception.JobPortalException;
import jakarta.mail.MessagingException;

public interface UserService {
    public UserDTO registerUser(UserDTO userDTO) throws JobPortalException;

    public  UserDTO loginUser(LoginDTO loginDTO) throws JobPortalException;

    public Boolean sendOtp(String email) throws JobPortalException, MessagingException;
    public Boolean verifyOtp(String email,String Otp) throws JobPortalException;
    public ResponseDTO changePassword(LoginDTO loginDTO) throws JobPortalException;


}
