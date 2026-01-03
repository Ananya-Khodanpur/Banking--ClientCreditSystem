package com.security;

import com.bean.User;
import com.enums.Role;
import com.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.core.env.Environment;

import static org.mockito.Mockito.*;

@MockitoSettings(strictness = Strictness.LENIENT)
@ExtendWith(MockitoExtension.class)
class DataInitializerTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private Environment environment;

    @InjectMocks
    private DataInitializer dataInitializer;

    @BeforeEach
    void setUp() {
        when(userRepository.count()).thenReturn(0L);
        when(environment.getProperty("DEFAULT_ADMIN_PASSWORD", "admin123")).thenReturn("admin123");
        when(environment.getProperty("DEFAULT_RM_PASSWORD", "rm123")).thenReturn("rm123");
        when(environment.getProperty("DEFAULT_ANALYST_PASSWORD", "analyst123")).thenReturn("analyst123");
        when(passwordEncoder.encode(anyString())).thenReturn("encoded-password");
    }

    @Test
    void initUsers_createsDefaultUsers_whenDatabaseIsEmpty() throws Exception {
        // Act
        dataInitializer.initUsers(userRepository, passwordEncoder, environment).run();

        // Assert
        verify(userRepository, times(3)).save(any(User.class));
        verify(passwordEncoder, times(3)).encode(anyString());
    }

    @Test
    void initUsers_skipsCreation_whenDatabaseHasUsers() throws Exception {
        // Arrange
        when(userRepository.count()).thenReturn(5L);

        // Act
        dataInitializer.initUsers(userRepository, passwordEncoder, environment).run();

        // Assert
        verify(userRepository, never()).save(any(User.class));
        verify(passwordEncoder, never()).encode(anyString());
    }

    @Test
    void initUsers_usesEnvironmentPasswords() throws Exception {
        // Arrange
        when(environment.getProperty("DEFAULT_ADMIN_PASSWORD", "admin123")).thenReturn("custom-admin-pass");
        when(environment.getProperty("DEFAULT_RM_PASSWORD", "rm123")).thenReturn("custom-rm-pass");
        when(environment.getProperty("DEFAULT_ANALYST_PASSWORD", "analyst123")).thenReturn("custom-analyst-pass");

        // Act
        dataInitializer.initUsers(userRepository, passwordEncoder, environment).run();

        // Assert
        verify(passwordEncoder).encode("custom-admin-pass");
        verify(passwordEncoder).encode("custom-rm-pass");
        verify(passwordEncoder).encode("custom-analyst-pass");
    }

    @Test
    void initUsers_createsAdminUser() throws Exception {
        // Act
        dataInitializer.initUsers(userRepository, passwordEncoder, environment).run();

        // Assert
        verify(userRepository).save(argThat(user -> 
            user.getUsername().equals("admin") && 
            user.getEmail().equals("admin@corpbank.com") &&
            user.getRole() == Role.ADMIN &&
            user.isActive()
        ));
    }

    @Test
    void initUsers_createsRMUser() throws Exception {
        // Act
        dataInitializer.initUsers(userRepository, passwordEncoder, environment).run();

        // Assert
        verify(userRepository).save(argThat(user -> 
            user.getUsername().equals("rmuser") && 
            user.getEmail().equals("rm@corpbank.com") &&
            user.getRole() == Role.RM &&
            user.isActive()
        ));
    }

    @Test
    void initUsers_createsAnalystUser() throws Exception {
        // Act
        dataInitializer.initUsers(userRepository, passwordEncoder, environment).run();

        // Assert
        verify(userRepository).save(argThat(user -> 
            user.getUsername().equals("analyst") && 
            user.getEmail().equals("analyst@corpbank.com") &&
            user.getRole() == Role.ANALYST &&
            user.isActive()
        ));
    }
}
