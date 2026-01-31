package com.courier.org.controller;

import com.courier.org.dto.UpdateUserRequest;
import com.courier.org.dto.UserResponse;
import com.courier.org.model.User;
import com.courier.org.service.AdminService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final AdminService adminService; // We can reuse AdminService logic for updates

    public UserController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(adminService.getUserById(user.getId()));
    }

    @PutMapping("/me")
    public ResponseEntity<UserResponse> updateProfile(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody UpdateUserRequest request) {
        // Reuse adminService update logic but targeting current user
        return ResponseEntity.ok(adminService.updateUser(user.getId(), request));
    }
}
