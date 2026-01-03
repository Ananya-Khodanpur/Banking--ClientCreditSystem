package com.enums;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class RoleTest {

    @Test
    void shouldHaveAllRequiredRoles() {
        // Arrange & Act & Assert
        assertNotNull(Role.ADMIN);
        assertNotNull(Role.RM);
        assertNotNull(Role.ANALYST);
    }

    @Test
    void shouldCompareRoles() {
        // Arrange & Act & Assert
        Role admin = Role.ADMIN;
        assertEquals(Role.ADMIN, admin);
        assertNotEquals(Role.RM, admin);
        assertNotEquals(Role.ANALYST, Role.RM);
        assertNotEquals(Role.ANALYST, admin);
    }

    @Test
    void shouldHaveRoleToString() {
        // Arrange & Act & Assert
        assertNotNull(Role.ADMIN.toString());
        assertNotNull(Role.RM.toString());
        assertNotNull(Role.ANALYST.toString());
    }

    @Test
    void shouldHaveRoleValues() {
        // Arrange & Act & Assert
        assertEquals("ADMIN", Role.ADMIN.name());
        assertEquals("RM", Role.RM.name());
        assertEquals("ANALYST", Role.ANALYST.name());
    }

    @Test
    void shouldHaveRoleOrdinal() {
        // Arrange & Act & Assert
        assertTrue(Role.ADMIN.ordinal() >= 0);
        assertTrue(Role.RM.ordinal() >= 0);
        assertTrue(Role.ANALYST.ordinal() >= 0);
    }
}
