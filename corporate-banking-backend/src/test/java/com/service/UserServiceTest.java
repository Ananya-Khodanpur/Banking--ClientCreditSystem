package com.service;

import com.bean.User;
import com.dto.UserDto;
import com.enums.Role;
import com.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(org.mockito.junit.jupiter.MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private BCryptPasswordEncoder encoder;

    @InjectMocks
    private UserService userService;

    @Test
    void shouldReturnAllUsers() {
        User user = new User();
        user.setId("1");
        user.setUsername("admin");
        user.setRole(Role.ADMIN);
        user.setActive(true);

        when(userRepository.findAll()).thenReturn(List.of(user));

        List<UserDto> result = userService.getAllUsers();

        assertEquals(1, result.size());
        assertEquals("admin", result.get(0).getUsername());
    }

    @Test
    void shouldUpdateUserStatus() {
        User user = new User();
        user.setId("1");
        user.setActive(false);

        when(userRepository.findById("1")).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenReturn(user);

        UserDto dto = userService.updateStatus("1", true);

        assertTrue(dto.isActive());
        verify(userRepository).save(user);
    }

    @Test
    void shouldThrowWhenUserNotFound() {
        when(userRepository.findById("404")).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class,
                () -> userService.updateStatus("404", true));
    }
}
