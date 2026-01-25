package com.courier.org.dto;

import com.courier.org.model.Role;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdateUserRequest {
    private String name;

    @Email(message = "Invalid email format")
    private String email;

    private String phone;
    private Role role;
    private Boolean active;
}
