package com.dto;

import com.enums.Role;

public class UserDto {
    private String id;
    private String username;
    private Role role;
    private boolean active;
    private String email;

    public UserDto(String id, String username, Role role) {
        this.id = id;
        this.username = username;
        this.role = role;
    }

    public UserDto(String id, String username, String email, Role role, boolean active) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
        this.active = active;
    }

    public UserDto() {

    }

    public String getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public Role getRole() {
        return role;
    }

    public String getEmail() {
        return email;
    }

    public boolean isActive() {
        return active;
    }
}

