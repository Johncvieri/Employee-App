package com.enigmacamp.testwebmvc.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http

                .cors(cors -> cors.configurationSource(request -> {
                    var cfg = new org.springframework.web.cors.CorsConfiguration();
                    cfg.setAllowedOrigins(java.util.List.of("http://localhost:5173")); // URL React
                    cfg.setAllowedMethods(java.util.List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    cfg.setAllowedHeaders(java.util.List.of("*"));
                    cfg.setAllowCredentials(true);
                    return cfg;
                }))
                .csrf(csrf -> csrf.disable()) // Disable CSRF untuk mempermudah REST API testing
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/**").authenticated() // Semua API harus login
                        .anyRequest().permitAll()
                )
                .httpBasic(Customizer.withDefaults()); // Mengaktifkan Basic Auth (admin:admin123)

        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        // Menggunakan NoOpPasswordEncoder agar admin123 terbaca plain text untuk testing
        UserDetails user = User.withUsername("admin")
                .password("{noop}admin123")
                .roles("USER")
                .build();
        return new InMemoryUserDetailsManager(user);
    }
}