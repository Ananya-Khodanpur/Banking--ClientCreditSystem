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
                // Admin user
                User admin = new User();
                admin.setUsername("admin");
                admin.setEmail("admin@corpbank.com");
                admin.setPassword(encoder.encode("admin123"));
                admin.setRole(Role.ADMIN);
                admin.setActive(true);
                repo.save(admin);

                // RM user
                User rm = new User();
                rm.setUsername("rmuser");
                rm.setEmail("rm@corpbank.com");
                rm.setPassword(encoder.encode("rm123"));
                rm.setRole(Role.RM);
                rm.setActive(true);
                repo.save(rm);

                // Analyst user
                User analyst = new User();
                analyst.setUsername("analyst");
                analyst.setEmail("analyst@corpbank.com");
                analyst.setPassword(encoder.encode("analyst123"));
                analyst.setRole(Role.ANALYST);
                analyst.setActive(true);
                repo.save(analyst);

                System.out.println("Default users created: admin/admin123, rmuser/rm123, analyst/analyst123");
            }
        };
    }
}
