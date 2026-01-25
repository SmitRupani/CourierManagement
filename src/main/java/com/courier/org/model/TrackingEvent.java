package com.courier.org.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

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

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPackageId() {
        return packageId;
    }

    public void setPackageId(String packageId) {
        this.packageId = packageId;
    }

    public String getTrackingNumber() {
        return trackingNumber;
    }

    public void setTrackingNumber(String trackingNumber) {
        this.trackingNumber = trackingNumber;
    }

    public PackageStatus getStatus() {
        return status;
    }

    public void setStatus(PackageStatus status) {
        this.status = status;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
