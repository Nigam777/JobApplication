package com.example.Jobportal.api;


import com.example.Jobportal.dto.LoginDTO;
import com.example.Jobportal.dto.ResponseDTO;
import com.example.Jobportal.dto.UserDTO;
import com.example.Jobportal.service.UserService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:8080")

@Validated
@RequestMapping("/api/users")
public class UserApi {
    @Autowired
    private UserService userService;
    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@RequestBody  @Valid  UserDTO userDTO) {

        userDTO = userService.registerUser(userDTO);
        return new ResponseEntity<>(userDTO, HttpStatus.CREATED);
    }
    @PostMapping("/login")
    public ResponseEntity<UserDTO> registerUser(@RequestBody  @Valid LoginDTO loginDTO) {
        return new ResponseEntity<>(userService.loginUser(loginDTO), HttpStatus.OK);
    }
    @PostMapping("/sendOtp/{email}")
    public ResponseEntity<ResponseDTO> sendOtp(@PathVariable String email) throws MessagingException {
        userService.sendOtp(email);
        return new ResponseEntity<>(new ResponseDTO("OTP sent successfully"), HttpStatus.OK);
    }
    @GetMapping("/verifyOtp/{email}/{otp}")
    public ResponseEntity<ResponseDTO> verifyOtp(@PathVariable String email, @PathVariable String otp) {
        userService.verifyOtp(email, otp);
        return new ResponseEntity<>(new ResponseDTO("OTP verified successfully"), HttpStatus.OK);
    }
    @PostMapping("/changePassword")
    public ResponseEntity<ResponseDTO> changePassword(@RequestBody @Valid LoginDTO loginDTO) {
        userService.changePassword(loginDTO);
        return new ResponseEntity<>(new ResponseDTO("Password changed successfully"), HttpStatus.OK);
    }





























}
