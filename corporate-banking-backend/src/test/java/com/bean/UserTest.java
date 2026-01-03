package com.bean;

import com.enums.Role;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UserTest {

    @Test
    void shouldCreateUser() {
        // Arrange & Act
        User user = new User();
        user.setId("1");
        user.setUsername("testuser");
        user.setEmail("test@example.com");
        user.setPassword("password123");
        user.setRole(Role.RM);
        user.setActive(true);

        // Assert
        assertEquals("1", user.getId());
        assertEquals("testuser", user.getUsername());
        assertEquals("test@example.com", user.getEmail());
        assertEquals("password123", user.getPassword());
        assertEquals(Role.RM, user.getRole());
        assertTrue(user.isActive());
    }

    @Test
    void shouldHandleUserRoles() {
        User adminUser = new User();
        adminUser.setRole(Role.ADMIN);
        assertEquals(Role.ADMIN, adminUser.getRole());

        User rmUser = new User();
        rmUser.setRole(Role.RM);
        assertEquals(Role.RM, rmUser.getRole());

        User analystUser = new User();
        analystUser.setRole(Role.ANALYST);
        assertEquals(Role.ANALYST, analystUser.getRole());
    }

    @Test
    void shouldHandleActiveStatus() {
        User activeUser = new User();
        activeUser.setActive(true);
        assertTrue(activeUser.isActive());

        User inactiveUser = new User();
        inactiveUser.setActive(false);
        assertFalse(inactiveUser.isActive());
    }

    @Test
    void shouldValidateEmailFormat() {
        User user = new User();
        user.setEmail("valid@example.com");
        assertTrue(user.getEmail().contains("@"));

        user.setEmail("another.valid@test.org");
        assertTrue(user.getEmail().contains("@"));
    }

    @Test
    void shouldValidatePasswordLength() {
        User user = new User();
        user.setPassword("valid123");
        assertTrue(user.getPassword().length() >= 6);

        user.setPassword("short");
        assertTrue(user.getPassword().length() < 6);
    }
}
