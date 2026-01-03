package com.dto;

import com.enums.Role;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UserDtoTest {

    @Test
    void shouldCreateUserDtoWithAllParameters() {
        // Arrange & Act
        UserDto userDto = new UserDto("1", "testuser", "test@example.com", Role.RM, true);

        // Assert
        assertEquals("1", userDto.getId());
        assertEquals("testuser", userDto.getUsername());
        assertEquals("test@example.com", userDto.getEmail());
        assertEquals(Role.RM, userDto.getRole());
        assertTrue(userDto.isActive());
    }

    @Test
    void shouldCreateUserDtoWithPartialParameters() {
        // Arrange & Act
        UserDto userDto = new UserDto("1", "testuser", Role.RM);

        // Assert
        assertEquals("1", userDto.getId());
        assertEquals("testuser", userDto.getUsername());
        assertEquals(Role.RM, userDto.getRole());
        assertFalse(userDto.isActive()); // Default should be false
    }

    @Test
    void shouldCreateEmptyUserDto() {
        // Arrange & Act
        UserDto userDto = new UserDto();

        // Assert
        assertNull(userDto.getId());
        assertNull(userDto.getUsername());
        assertNull(userDto.getEmail());
        assertNull(userDto.getRole());
        assertFalse(userDto.isActive());
    }

    @Test
    void shouldHandleDifferentRoles() {
        // Test ADMIN role
        UserDto adminUser = new UserDto("1", "admin", "admin@example.com", Role.ADMIN, true);
        assertEquals(Role.ADMIN, adminUser.getRole());

        // Test RM role
        UserDto rmUser = new UserDto("2", "rm", "rm@example.com", Role.RM, true);
        assertEquals(Role.RM, rmUser.getRole());

        // Test ANALYST role
        UserDto analystUser = new UserDto("3", "analyst", "analyst@example.com", Role.ANALYST, false);
        assertEquals(Role.ANALYST, analystUser.getRole());
    }

    @Test
    void shouldHandleActiveStatus() {
        UserDto activeUser = new UserDto("1", "active", "active@example.com", Role.RM, true);
        assertTrue(activeUser.isActive());

        UserDto inactiveUser = new UserDto("2", "inactive", "inactive@example.com", Role.RM, false);
        assertFalse(inactiveUser.isActive());
    }
}
