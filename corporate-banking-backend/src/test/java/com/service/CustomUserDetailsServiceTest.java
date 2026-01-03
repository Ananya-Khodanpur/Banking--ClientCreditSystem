package com.service;

import com.bean.User;
import com.enums.Role;
import com.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CustomUserDetailsServiceTest {

    @Mock
    private UserRepository repo;

    @InjectMocks
    private CustomUserDetailsService service;

    private User mockUser(String username, Role role, boolean active) {
        User user = new User();
        user.setUsername(username);
        user.setPassword("encodedPassword");
        user.setRole(role);
        user.setActive(active);
        return user;
    }

    /* ================= LOAD USER BY USERNAME ================= */

    @Test
    void loadUserByUsername_success_forActiveUser() {
        User user = mockUser("rmuser", Role.RM, true);
        when(repo.findByUsername("rmuser")).thenReturn(Optional.of(user));

        UserDetails userDetails = service.loadUserByUsername("rmuser");

        assertNotNull(userDetails);
        assertEquals("rmuser", userDetails.getUsername());
        assertEquals("encodedPassword", userDetails.getPassword());
        assertTrue(userDetails.isAccountNonLocked()); // Active user should not be locked
        
        // Check authorities
        assertTrue(userDetails.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_RM")));
    }

    @Test
    void loadUserByUsername_success_forAnalyst() {
        User user = mockUser("analyst", Role.ANALYST, true);
        when(repo.findByUsername("analyst")).thenReturn(Optional.of(user));

        UserDetails userDetails = service.loadUserByUsername("analyst");

        assertNotNull(userDetails);
        assertEquals("analyst", userDetails.getUsername());
        assertEquals("encodedPassword", userDetails.getPassword());
        assertTrue(userDetails.isAccountNonLocked()); // Active user should not be locked
        
        // Check authorities
        assertTrue(userDetails.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_ANALYST")));
    }

    @Test
    void loadUserByUsername_success_forAdmin() {
        User user = mockUser("admin", Role.ADMIN, true);
        when(repo.findByUsername("admin")).thenReturn(Optional.of(user));

        UserDetails userDetails = service.loadUserByUsername("admin");

        assertNotNull(userDetails);
        assertEquals("admin", userDetails.getUsername());
        assertEquals("encodedPassword", userDetails.getPassword());
        assertTrue(userDetails.isAccountNonLocked()); // Active user should not be locked
        
        // Check authorities
        assertTrue(userDetails.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN")));
    }

    @Test
    void loadUserByUsername_lockedAccount_forInactiveUser() {
        User user = mockUser("inactive", Role.RM, false);
        when(repo.findByUsername("inactive")).thenReturn(Optional.of(user));

        UserDetails userDetails = service.loadUserByUsername("inactive");

        assertNotNull(userDetails);
        assertEquals("inactive", userDetails.getUsername());
        assertFalse(userDetails.isAccountNonLocked()); // Inactive user should be locked
    }

    @Test
    void loadUserByUsername_throwsException_whenUserNotFound() {
        when(repo.findByUsername("nonexistent")).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class,
                () -> service.loadUserByUsername("nonexistent"));
    }

    /* ================= EDGE CASES ================= */

    @Test
    void loadUserByUsername_withNullUsername() {
        when(repo.findByUsername(null)).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class,
                () -> service.loadUserByUsername(null));
    }

    @Test
    void loadUserByUsername_withEmptyUsername() {
        when(repo.findByUsername("")).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class,
                () -> service.loadUserByUsername(""));
    }

    @Test
    void loadUserByUsername_authoritiesCount() {
        User user = mockUser("rmuser", Role.RM, true);
        when(repo.findByUsername("rmuser")).thenReturn(Optional.of(user));

        UserDetails userDetails = service.loadUserByUsername("rmuser");

        assertNotNull(userDetails);
        assertEquals(1, userDetails.getAuthorities().size());
    }

    @Test
    void loadUserByUsername_passwordEncoding() {
        User user = mockUser("testuser", Role.RM, true);
        user.setPassword("$2a$10$encoded.password.here");
        when(repo.findByUsername("testuser")).thenReturn(Optional.of(user));

        UserDetails userDetails = service.loadUserByUsername("testuser");

        assertNotNull(userDetails);
        assertEquals("$2a$10$encoded.password.here", userDetails.getPassword());
    }

    @Test
    void loadUserByUsername_rolePrefix() {
        // Test all roles have proper ROLE_ prefix
        Role[] roles = {Role.RM, Role.ANALYST, Role.ADMIN};
        
        for (Role role : roles) {
            User user = mockUser("test" + role.name(), role, true);
            when(repo.findByUsername("test" + role.name())).thenReturn(Optional.of(user));

            UserDetails userDetails = service.loadUserByUsername("test" + role.name());

            assertNotNull(userDetails);
            assertTrue(userDetails.getAuthorities().stream()
                    .anyMatch(auth -> auth.getAuthority().equals("ROLE_" + role.name())));
        }
    }
}
