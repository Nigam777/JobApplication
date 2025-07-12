package com.example.Jobportal.service;

import com.example.Jobportal.dto.LoginDTO;
import com.example.Jobportal.dto.ResponseDTO;
import com.example.Jobportal.dto.UserDTO;
import com.example.Jobportal.entity.Otp;
import com.example.Jobportal.entity.User;
import com.example.Jobportal.exception.JobPortalException;
import com.example.Jobportal.repository.OtpRepo;
import com.example.Jobportal.repository.UserRepo;
import com.example.Jobportal.utility.Data;
import com.example.Jobportal.utility.Utilities;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service(value = "userService")
@Component
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private Utilities utilities;
    @Autowired
    private ProfileService profileService;

    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private OtpRepo otpService;

    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public UserDTO registerUser(UserDTO userDTO) {
        User user = userDTO.toEntity();
        Optional<User> optional = userRepo.findByEmail(userDTO.getEmail());
        if (optional.isPresent()) throw new JobPortalException("USER_FOUND");
        if (user.getEmail() == null) {
            throw new IllegalArgumentException("Email cannot be null");
        }
        userDTO.setProfileId(profileService.createProfile(userDTO.getEmail()));
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        user.setId(utilities.getNextSequence("users"));

        User savedUser = userRepo.save(user);
        System.out.println("Saved User: " + savedUser);

        return userDTO;
    }

    @Override
    public UserDTO loginUser(LoginDTO loginDTO) {
        User user = userRepo.findByEmail(loginDTO.getEmail()).orElseThrow(() -> new JobPortalException("USER_NOT_FOUND"));
        if (!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword()))
            throw new JobPortalException("INVALID_CREDENTIALS");
        return user.toDTO();
    }

    @Override
    public Boolean sendOtp(String email) throws JobPortalException, MessagingException {
        Optional<User> optional = userRepo.findByEmail(email);
        if (optional.isPresent()) {
            MimeMessage mm = javaMailSender.createMimeMessage();
            MimeMessageHelper message = new MimeMessageHelper(mm, true);
            message.setTo(email);
            message.setSubject("OTP");
            String generatedOtp = utilities.generateOTP();
            Otp otp = new Otp(generatedOtp, email, LocalDateTime.now());
            otpService.save(otp);
            //System.out.println("Saved OTP: " + otp);
            message.setText(Data.getMessageBody(generatedOtp), true);
            javaMailSender.send(mm);
        }else{
            throw new JobPortalException("USER_NOT_FOUND");
        }
        return true;


    }

    @Override
    public Boolean verifyOtp(String email, String Otp) throws JobPortalException {
        Otp otpEntity = otpService.findById(email).orElseThrow(() -> new JobPortalException("OTP_NOT_FOUND"));
        LocalDateTime currentTime = LocalDateTime.now();
        if (otpEntity.getCreationTime().plusMinutes(2).isAfter(currentTime)) {

            if (otpEntity.getOtp().equals(Otp)) {
                otpService.deleteById(email);
                return true;
            } else {
                throw new JobPortalException("INVALID_OTP");
            }
        } else {
            throw new JobPortalException("OTP_EXPIRED");
        }


    }

    @Override
    public ResponseDTO changePassword(LoginDTO loginDTO) throws JobPortalException {
        User user = userRepo.findByEmail(loginDTO.getEmail()).orElseThrow(() -> new JobPortalException("USER_NOT_FOUND"));

        user.setPassword(passwordEncoder.encode(loginDTO.getPassword()));
        userRepo.save(user);
        return new ResponseDTO("Password changed successfully");
    }

    @Scheduled(fixedRate = 60000)
    public void removeExpiredOtps() {
        LocalDateTime expiry = LocalDateTime.now().minusMinutes(5);
        List<Otp> expiredOtps = otpService.findByCreationTimeBefore(expiry);
        if (!expiredOtps.isEmpty()) {
            otpService.deleteAll(expiredOtps);
            //System.out.println("Expired OTPs removed: " + expiredOtps);
        }


    }


}























