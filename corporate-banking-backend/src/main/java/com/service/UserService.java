package com.service;

import com.dto.UserDto;
import com.bean.User;
import com.enums.Role;
import com.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository repo;
    private final BCryptPasswordEncoder encoder;

    public UserService(UserRepository repo, BCryptPasswordEncoder encoder) {
        this.repo = repo;
        this.encoder = encoder;
    }

    public UserDto createUser(String username, String email, String password, Role role) {
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(encoder.encode(password));
        user.setRole(role);
        user.setActive(true);
        repo.save(user);
        return toDto(user);
    }

    public List<UserDto> getAllUsers() {
        return repo.findAll().stream().map(this::toDto).toList();
    }

    public UserDto updateStatus(String userId, boolean active) {
        User user = repo.findById(userId).orElseThrow();
        user.setActive(active);
        repo.save(user);
        return toDto(user);
    }

    private UserDto toDto(User user) {
        return new UserDto(user.getId(), user.getUsername(), user.getEmail(), user.getRole(), user.isActive());
    }
}

