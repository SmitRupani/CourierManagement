package com.courier.org.dto;

import com.courier.org.model.PackageStatus;
import com.courier.org.model.TrackingEvent;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class TrackingEventResponse {
    private String id;
    private String trackingNumber;
    private PackageStatus status;
    private String location;
    private String remarks;
    private LocalDateTime timestamp;

    public static TrackingEventResponse fromEntity(TrackingEvent event) {
        TrackingEventResponse response = new TrackingEventResponse();
        response.setId(event.getId());
        response.setTrackingNumber(event.getTrackingNumber());
        response.setStatus(event.getStatus());
        response.setLocation(event.getLocation());
        response.setRemarks(event.getRemarks());
        response.setTimestamp(event.getTimestamp());
        return response;
    }
}
