package com.example.Jobportal.entity;

import com.example.Jobportal.dto.AccountType;
import com.example.Jobportal.dto.UserDTO;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Users")
@Data
@NoArgsConstructor

public class User {
    @Id
    private Long id;
    private String name;
    @Indexed(unique = true)
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @NotNull
    private String email;
    private String password;
    private AccountType accountType;
    private  Long profileId;
    public User(Long id, String name, String email, String password, AccountType accountType, Long profileId) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.accountType = accountType;
        this.profileId = profileId;

    }

    public UserDTO toDTO() {
        return new UserDTO(this.id, this.name, this.email, this.password, this.accountType, this.profileId);
    }

}