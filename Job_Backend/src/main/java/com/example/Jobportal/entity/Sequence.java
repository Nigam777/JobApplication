package com.example.Jobportal.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.bind.annotation.CrossOrigin;

@Data
@CrossOrigin
@Document(collection = "Sequence")
public class Sequence {
    @Id
    private String id;
    private long seq;
}
