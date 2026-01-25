package com.courier.org.service;

import com.courier.org.dto.TrackingEventResponse;
import com.courier.org.exception.ResourceNotFoundException;
import com.courier.org.model.CourierPackage;
import com.courier.org.model.PackageStatus;
import com.courier.org.model.TrackingEvent;
import com.courier.org.repository.PackageRepository;
import com.courier.org.repository.TrackingEventRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TrackingService {

    private final TrackingEventRepository trackingEventRepository;
    private final PackageRepository packageRepository;

    public TrackingService(TrackingEventRepository trackingEventRepository, PackageRepository packageRepository) {
        this.trackingEventRepository = trackingEventRepository;
        this.packageRepository = packageRepository;
    }

    public TrackingEventResponse addTrackingEvent(String packageId, PackageStatus status, String location,
            String remarks) {
        CourierPackage pkg = packageRepository.findById(packageId)
                .orElseThrow(() -> new ResourceNotFoundException("Package not found with id: " + packageId));

        TrackingEvent event = new TrackingEvent(
                pkg.getId(),
                pkg.getTrackingNumber(),
                status,
                location,
                remarks);

        TrackingEvent saved = trackingEventRepository.save(event);
        return TrackingEventResponse.fromEntity(saved);
    }

    public List<TrackingEventResponse> getTrackingHistory(String trackingNumber) {
        packageRepository.findByTrackingNumber(trackingNumber)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Package not found with tracking number: " + trackingNumber));

        return trackingEventRepository.findByTrackingNumberOrderByTimestampDesc(trackingNumber)
                .stream()
                .map(TrackingEventResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public List<TrackingEventResponse> getTrackingHistoryByPackageId(String packageId) {
        return trackingEventRepository.findByPackageIdOrderByTimestampDesc(packageId)
                .stream()
                .map(TrackingEventResponse::fromEntity)
                .collect(Collectors.toList());
    }
}
