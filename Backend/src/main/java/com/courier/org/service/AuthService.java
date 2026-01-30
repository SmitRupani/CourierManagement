package com.courier.org.service;

import com.courier.org.dto.AuthResponse;
import com.courier.org.dto.LoginRequest;
import com.courier.org.dto.RegisterRequest;
import com.courier.org.dto.UserResponse;
import com.courier.org.exception.UserAlreadyExistsException;
import com.courier.org.model.Role;
import com.courier.org.model.User;
import com.courier.org.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

        private final UserRepository userRepository;
        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;
        private final AuthenticationManager authenticationManager;

        public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder,
                        JwtService jwtService, AuthenticationManager authenticationManager) {
                this.userRepository = userRepository;
                this.passwordEncoder = passwordEncoder;
                this.jwtService = jwtService;
                this.authenticationManager = authenticationManager;
        }

        public AuthResponse register(RegisterRequest request) {
                if (userRepository.existsByEmail(request.getEmail())) {
                        throw new UserAlreadyExistsException("Email already registered");
                }

                User user = User.builder()
                                .name(request.getName())
                                .email(request.getEmail())
                                .password(passwordEncoder.encode(request.getPassword()))
                                .phone(request.getPhone())
                                .role(Role.CUSTOMER)
                                .active(true)
                                .build();

                userRepository.save(user);
                String token = jwtService.generateToken(user);

                return AuthResponse.builder()
                                .token(token)
                                .email(user.getEmail())
                                .name(user.getName())
                                .role(user.getRole().name())
                                .build();
        }

        public AuthResponse login(LoginRequest request) {
                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

                User user = userRepository.findByEmail(request.getEmail())
                                .orElseThrow(() -> new RuntimeException("User not found"));

                String token = jwtService.generateToken(user);

                return AuthResponse.builder()
                                .token(token)
                                .email(user.getEmail())
                                .name(user.getName())
                                .role(user.getRole().name())
                                .build();
        }

        public UserResponse getCurrentUser(String email) {
                User user = userRepository.findByEmail(email)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                return UserResponse.builder()
                                .id(user.getId())
                                .name(user.getName())
                                .email(user.getEmail())
                                .phone(user.getPhone())
                                .role(user.getRole().name())
                                .active(user.isActive())
                                .build();
        }
}
