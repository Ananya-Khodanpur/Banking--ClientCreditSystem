package com.dto;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class LoginResponse {
    private String token;
    private UserDto user;

    public LoginResponse(String token, UserDto user) {
        this.token = token;
        this.user = user;
    }
}

