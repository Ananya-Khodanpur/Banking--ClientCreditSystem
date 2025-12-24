package com.controller;

import com.dto.CreateUserRequest;
import com.dto.StatusUpdateRequest;
import com.dto.UserDto;
import com.service.UserService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminController {
    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    @PreAuthorize("hasRole('ADMIN')")
    public UserDto createUser(@RequestBody CreateUserRequest request) {
        return userService.createUser(request.getUsername(), request.getEmail(), request.getPassword(), request.getRole());
    }

    @GetMapping("/users")
    public List<UserDto> getAllUsers() {
        return userService.getAllUsers();
    }

    @PutMapping("/users/{id}/status")
    public UserDto updateUserStatus(@PathVariable String id, @RequestBody StatusUpdateRequest request) {
        return userService.updateStatus(id, request.isActive());
    }
}
