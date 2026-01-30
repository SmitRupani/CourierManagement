package com.courier.org.controller;

import com.courier.org.dto.TrackingEventResponse;
import com.courier.org.dto.UpdateStatusRequest;
import com.courier.org.service.TrackingService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tracking")
public class TrackingController {

    private final TrackingService trackingService;

    public TrackingController(TrackingService trackingService) {
        this.trackingService = trackingService;
    }

    @GetMapping("/{trackingNumber}/history")
    public ResponseEntity<List<TrackingEventResponse>> getTrackingHistory(@PathVariable String trackingNumber) {
        return ResponseEntity.ok(trackingService.getTrackingHistory(trackingNumber));
    }

    @PostMapping("/{packageId}/event")
    @PreAuthorize("hasAnyRole('ADMIN', 'COURIER')")
    public ResponseEntity<TrackingEventResponse> addTrackingEvent(
            @PathVariable String packageId,
            @RequestBody UpdateStatusRequest request) {
        return ResponseEntity.ok(trackingService.addTrackingEvent(
                packageId,
                request.getStatus(),
                request.getLocation(),
                request.getRemarks()));
    }
}
