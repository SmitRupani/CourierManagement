package com.courier.org.controller;

import com.courier.org.dto.*;
import com.courier.org.model.User;
import com.courier.org.service.PackageService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/packages")
public class PackageController {

    private final PackageService packageService;

    public PackageController(PackageService packageService) {
        this.packageService = packageService;
    }

    @PostMapping
    public ResponseEntity<PackageResponse> createPackage(
            @Valid @RequestBody CreatePackageRequest request,
            Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(packageService.createPackage(request, user.getId()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PackageResponse> getPackageById(@PathVariable String id) {
        return ResponseEntity.ok(packageService.getPackageById(id));
    }

    @GetMapping("/track/{trackingNumber}")
    public ResponseEntity<PackageResponse> trackPackage(@PathVariable String trackingNumber) {
        return ResponseEntity.ok(packageService.getPackageByTrackingNumber(trackingNumber));
    }

    @GetMapping("/my-packages")
    public ResponseEntity<List<PackageResponse>> getMyPackages(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(packageService.getPackagesByUserId(user.getId()));
    }

    @GetMapping("/my-packages/paginated")
    public ResponseEntity<Page<PackageResponse>> getMyPackagesPaginated(
            Authentication authentication,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        User user = (User) authentication.getPrincipal();
        Sort sort = sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return ResponseEntity.ok(packageService.getPackagesByUserId(user.getId(), pageable));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PackageResponse> updatePackage(
            @PathVariable String id,
            @Valid @RequestBody UpdatePackageRequest request,
            Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(packageService.updatePackage(id, request, user.getId()));
    }

    @PatchMapping("/{id}/cancel")
    public ResponseEntity<PackageResponse> cancelPackage(
            @PathVariable String id,
            Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(packageService.cancelPackage(id, user.getId()));
    }

    @PostMapping("/calculate-price")
    public ResponseEntity<PriceCalculationResponse> calculatePrice(
            @RequestBody PriceCalculationRequest request) {
        return ResponseEntity.ok(packageService.calculatePriceDetails(request.getWeight(), request.getPackageType()));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<PackageResponse>> getAllPackages(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return ResponseEntity.ok(packageService.getAllPackages(pageable));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('ADMIN', 'COURIER')")
    public ResponseEntity<PackageResponse> updateStatus(
            @PathVariable String id,
            @Valid @RequestBody UpdateStatusRequest request) {
        return ResponseEntity.ok(packageService.updateStatus(id, request.getStatus(), request.getLocation(),
                request.getRemarks(), request.getOtp()));
    }
}
