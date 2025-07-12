package com.example.Jobportal.utility;


import com.example.Jobportal.exception.JobPortalException;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@RestControllerAdvice
public class ExceptionControllerAdvice {

    @Autowired
    private Environment environment;

    @ExceptionHandler
    public ResponseEntity<ErrorInfo> generalException(Exception e) {
        ErrorInfo error = new ErrorInfo(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value(), LocalDateTime.now());
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);

    }
    @ExceptionHandler(JobPortalException.class)
    public ResponseEntity<ErrorInfo> Job(Exception e) {
        String msg=environment.getProperty(e.getMessage());
        ErrorInfo error = new ErrorInfo(msg, HttpStatus.INTERNAL_SERVER_ERROR.value(), LocalDateTime.now());
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);

    }

    @ExceptionHandler({MethodArgumentNotValidException.class, ConstraintViolationException.class})
    public ResponseEntity<ErrorInfo> validatorExceptionHandler(Exception e) {
        String msg = "";
        if (e instanceof MethodArgumentNotValidException manvException) {
            msg = manvException.getAllErrors().stream().map(ObjectError::getDefaultMessage).collect(Collectors.joining(", "));
        } else {
            ConstraintViolationException cvExcaption = (ConstraintViolationException) e;
            msg = cvExcaption.getConstraintViolations().stream().map(ConstraintViolation::getMessage).collect(
                    Collectors.joining(", "));
        }

        ErrorInfo error = new ErrorInfo(msg, HttpStatus.BAD_REQUEST.value(), LocalDateTime.now());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }


}































































