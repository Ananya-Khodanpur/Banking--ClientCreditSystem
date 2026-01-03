package com.security;

import com.bean.User;
import com.repository.UserRepository;
import com.enums.Role;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Initializes default users in the system for development and testing purposes.
 * This configuration creates default admin, RM, and analyst users when the database is empty.
 * 
 * @author Corporate Banking Team
 * @version 1.0
 */
@Configuration
public class DataInitializer {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    @Bean
    CommandLineRunner initUsers(UserRepository repo, PasswordEncoder encoder, Environment env) {
        return args -> {
            if (repo.count() == 0) {
                // Get passwords from environment variables or use defaults for development
                String adminPassword = env.getProperty("DEFAULT_ADMIN_PASSWORD", "admin123");
                String rmPassword = env.getProperty("DEFAULT_RM_PASSWORD", "rm123");
                String analystPassword = env.getProperty("DEFAULT_ANALYST_PASSWORD", "analyst123");

                // Admin user
                User admin = new User();
                admin.setUsername("admin");
                admin.setEmail("admin@corpbank.com");
                admin.setPassword(encoder.encode(adminPassword));
                admin.setRole(Role.ADMIN);
                admin.setActive(true);
                repo.save(admin);

                // RM user
                User rm = new User();
                rm.setUsername("rmuser");
                rm.setEmail("rm@corpbank.com");
                rm.setPassword(encoder.encode(rmPassword));
                rm.setRole(Role.RM);
                rm.setActive(true);
                repo.save(rm);

                // Analyst user
                User analyst = new User();
                analyst.setUsername("analyst");
                analyst.setEmail("analyst@corpbank.com");
                analyst.setPassword(encoder.encode(analystPassword));
                analyst.setRole(Role.ANALYST);
                analyst.setActive(true);
                repo.save(analyst);

                logger.info("Default users created successfully");
                logger.warn("Default passwords should be changed in production environment");
            }
        };
    }
}
