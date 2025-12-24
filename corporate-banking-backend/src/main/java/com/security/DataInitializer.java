package com.security;

import com.bean.User;
import com.repository.UserRepository;
import com.enums.Role;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initUsers(UserRepository repo, PasswordEncoder encoder) {
        return args -> {
            if (repo.count() == 0) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setEmail("admin@corpbank.com");
                admin.setPassword(encoder.encode("admin123"));
                admin.setRole(Role.ADMIN);
                admin.setActive(true);

                repo.save(admin);
                System.out.println("Default ADMIN user created");
            }
        };
    }
}
