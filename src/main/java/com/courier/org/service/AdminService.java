package com.courier.org.service;

import com.courier.org.dto.DashboardStatsResponse;
import com.courier.org.dto.UpdateUserRequest;
import com.courier.org.dto.UserResponse;
import com.courier.org.exception.ResourceNotFoundException;
import com.courier.org.model.PackageStatus;
import com.courier.org.model.Role;
import com.courier.org.model.User;
import com.courier.org.repository.PackageRepository;
import com.courier.org.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final PackageRepository packageRepository;

    public AdminService(UserRepository userRepository, PackageRepository packageRepository) {
        this.userRepository = userRepository;
        this.packageRepository = packageRepository;
    }

    public Page<UserResponse> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable)
                .map(this::mapToUserResponse);
    }

    public UserResponse getUserById(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return mapToUserResponse(user);
    }

    public UserResponse updateUser(String id, UpdateUserRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        if (request.getName() != null) {
            user.setName(request.getName());
        }
        if (request.getEmail() != null) {
            user.setEmail(request.getEmail());
        }
        if (request.getPhone() != null) {
            user.setPhone(request.getPhone());
        }
        if (request.getRole() != null) {
            user.setRole(request.getRole());
        }
        if (request.getActive() != null) {
            user.setActive(request.getActive());
        }

        User saved = userRepository.save(user);
        return mapToUserResponse(saved);
    }

    public void deleteUser(String id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }

    public UserResponse updateUserRole(String id, Role role) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        user.setRole(role);
        User saved = userRepository.save(user);
        return mapToUserResponse(saved);
    }

    public UserResponse updateUserStatus(String id, boolean active) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        user.setActive(active);
        User saved = userRepository.save(user);
        return mapToUserResponse(saved);
    }

    public DashboardStatsResponse getDashboardStats() {
        DashboardStatsResponse stats = new DashboardStatsResponse();

        // User stats
        stats.setTotalUsers(userRepository.count());
        stats.setTotalCustomers(userRepository.countByRole(Role.CUSTOMER));
        stats.setTotalCouriers(userRepository.countByRole(Role.COURIER));

        // Package stats
        stats.setTotalPackages(packageRepository.count());
        stats.setCreatedPackages(packageRepository.countByStatus(PackageStatus.CREATED));
        stats.setInTransitPackages(packageRepository.countByStatus(PackageStatus.IN_TRANSIT));
        stats.setDeliveredPackages(packageRepository.countByStatus(PackageStatus.DELIVERED));
        stats.setCancelledPackages(packageRepository.countByStatus(PackageStatus.CANCELLED));

        // Packages by status breakdown
        List<DashboardStatsResponse.PackagesByStatusDto> packagesByStatus = new ArrayList<>();
        for (PackageStatus status : PackageStatus.values()) {
            long count = packageRepository.countByStatus(status);
            packagesByStatus.add(new DashboardStatsResponse.PackagesByStatusDto(status.name(), count));
        }
        stats.setPackagesByStatus(packagesByStatus);

        return stats;
    }

    public com.courier.org.dto.PackageResponse assignCourier(String packageId, String courierId) {
        com.courier.org.model.CourierPackage pkg = packageRepository.findById(packageId)
                .orElseThrow(() -> new ResourceNotFoundException("Package not found with id: " + packageId));

        User courier = userRepository.findById(courierId)
                .orElseThrow(() -> new ResourceNotFoundException("Courier not found with id: " + courierId));

        if (courier.getRole() != Role.COURIER) {
            throw new RuntimeException("Selected user is not a Courier");
        }

        pkg.setAssignedCourierId(courierId);
        com.courier.org.model.CourierPackage saved = packageRepository.save(pkg);
        return com.courier.org.dto.PackageResponse.fromEntity(saved);
    }

    private UserResponse mapToUserResponse(User user) {
        String roleName = user.getRole() != null ? user.getRole().name() : "UNKNOWN";
        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(roleName)
                .active(user.isActive())
                .build();
    }
}
