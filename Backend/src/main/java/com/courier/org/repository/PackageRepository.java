package com.courier.org.repository;

import com.courier.org.model.CourierPackage;
import com.courier.org.model.PackageStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PackageRepository extends MongoRepository<CourierPackage, String> {
    Optional<CourierPackage> findByTrackingNumber(String trackingNumber);

    List<CourierPackage> findByUserId(String userId);

    Page<CourierPackage> findByUserId(String userId, Pageable pageable);

    List<CourierPackage> findByUserIdAndStatus(String userId, PackageStatus status);

    Page<CourierPackage> findByStatus(PackageStatus status, Pageable pageable);

    long countByUserId(String userId);

    long countByStatus(PackageStatus status);
}
