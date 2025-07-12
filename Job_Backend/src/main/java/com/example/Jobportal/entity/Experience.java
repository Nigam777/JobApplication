package com.example.Jobportal.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Experience {
    private String title;
    private String company;
    private String location;
    private String startDate;
    private String endDate;
    private String description;
    private Boolean working;
}
