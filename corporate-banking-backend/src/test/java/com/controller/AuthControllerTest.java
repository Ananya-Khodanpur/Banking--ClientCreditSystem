package com.controller;

import com.bean.User;
import com.dto.LoginRequest;
import com.dto.LoginResponse;
import com.enums.Role;
import com.repository.UserRepository;
import com.security.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthControllerTest {

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtUtil jwtUtil;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private AuthController authController;

    private LoginRequest loginRequest;
    private User testUser;

    @BeforeEach
    void setUp() {
        loginRequest = new LoginRequest();
        loginRequest.setUsername("rmuser");
        loginRequest.setPassword("rm123");

        testUser = new User();
        testUser.setId("user123");
        testUser.setUsername("rmuser");
        testUser.setPassword("encodedPassword");
        testUser.setRole(Role.RM);
        testUser.setActive(true);
    }

    @Test
    void login_success() {
        // Arrange
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(new UsernamePasswordAuthenticationToken("rmuser", "rm123"));
        when(userRepository.findByUsername("rmuser")).thenReturn(java.util.Optional.of(testUser));
        when(jwtUtil.generateToken("rmuser", Role.RM)).thenReturn("mock-jwt-token");

        // Act
        LoginResponse response = authController.login(loginRequest);

        // Assert
        assertNotNull(response);
        assertEquals("mock-jwt-token", response.getToken());
        assertNotNull(response.getUser());
        assertEquals("rmuser", response.getUser().getUsername());
        assertEquals(Role.RM, response.getUser().getRole());
        assertEquals("user123", response.getUser().getId());
    }

    @Test
    void login_failure_invalidCredentials() {
        // Arrange
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(new BadCredentialsException("Invalid credentials"));

        // Act & Assert
        assertThrows(BadCredentialsException.class, () -> {
            authController.login(loginRequest);
        });
    }

    @Test
    void login_userNotFound() {
        // Arrange
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(new UsernamePasswordAuthenticationToken("rmuser", "rm123"));
        when(userRepository.findByUsername("rmuser")).thenReturn(java.util.Optional.empty());

        // Act & Assert
        assertThrows(java.util.NoSuchElementException.class, () -> {
            authController.login(loginRequest);
        });
    }

    @Test
    void login_nullRequest() {
        // Act & Assert
        assertThrows(NullPointerException.class, () -> {
            authController.login(null);
        });
    }

    @Test
    void login_emptyUsername() {
        // Arrange
        loginRequest.setUsername("");

        // Act & Assert
        assertThrows(Exception.class, () -> {
            authController.login(loginRequest);
        });
    }

    @Test
    void login_emptyPassword() {
        // Arrange
        loginRequest.setPassword("");

        // Act & Assert
        assertThrows(Exception.class, () -> {
            authController.login(loginRequest);
        });
    }
}
