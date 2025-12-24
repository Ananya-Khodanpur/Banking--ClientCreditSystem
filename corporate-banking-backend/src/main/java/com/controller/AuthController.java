package com.controller;

import com.bean.User;
import com.repository.UserRepository;
import com.dto.LoginRequest;
import com.dto.LoginResponse;
import com.dto.UserDto;
import com.security.JwtUtil;
import org.springframework.security.authentication.*;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    public AuthController(AuthenticationManager authenticationManager,
                          JwtUtil jwtUtil,
                          UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        User user = userRepository
                .findByUsername(request.getUsername())
                .orElseThrow();

        String token = jwtUtil.generateToken(user.getUsername(),user.getRole());


        UserDto userDto = new UserDto(
                user.getId(),
                user.getUsername(),
                user.getRole()
        );

        return new LoginResponse(token, userDto);
    }

}

