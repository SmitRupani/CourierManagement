package com.courier.org.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

import lombok.Data;

@Data
@Document(collection = "tracking_events")
public class TrackingEvent {

    @Id
    private String id;

    private String packageId;
    private String trackingNumber;

    private PackageStatus status;
    private String location;
    private String remarks;

    private LocalDateTime timestamp;

    public TrackingEvent() {
        this.timestamp = LocalDateTime.now();
    }

    public TrackingEvent(String packageId, String trackingNumber, PackageStatus status, String location,
            String remarks) {
        this.packageId = packageId;
        this.trackingNumber = trackingNumber;
        this.status = status;
        this.location = location;
        this.remarks = remarks;
        this.timestamp = LocalDateTime.now();
    }
}
