package com.dto;

import com.enums.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateUserRequest {
    private String username;
    private String email;
    private String password;
    private Role role;
}
