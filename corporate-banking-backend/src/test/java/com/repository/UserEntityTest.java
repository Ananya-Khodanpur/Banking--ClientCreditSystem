package com.repository;

import com.bean.User;
import com.enums.Role;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class SimpleUserRepositoryTest {

    @Test
    void shouldCreateUser() {
        // Simple unit test without database dependencies
        User user = new User();
        user.setUsername("testuser");
        user.setEmail("test@example.com");
        user.setPassword("password");
        user.setRole(Role.RM);
        user.setActive(true);

        assertNotNull(user);
        assertEquals("testuser", user.getUsername());
        assertEquals("test@example.com", user.getEmail());
        assertEquals(Role.RM, user.getRole());
        assertTrue(user.isActive());
    }

    @Test
    void shouldUpdateUser() {
        User user = new User();
        user.setUsername("testuser");
        user.setActive(true);

        user.setActive(false);
        assertFalse(user.isActive());
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
    void shouldValidateUserFields() {
        User user = new User();
        user.setUsername("testuser");
        user.setEmail("test@example.com");
        user.setPassword("password123");
        user.setRole(Role.RM);
        user.setActive(true);

        assertTrue(user.getUsername().length() >= 3);
        assertTrue(user.getEmail().contains("@"));
        assertTrue(user.getPassword().length() >= 6);
        assertNotNull(user.getRole());
    }
}
