package com.courier.org.dto;

import com.courier.org.model.PackageStatus;
import com.courier.org.model.TrackingEvent;

import java.time.LocalDateTime;

public class TrackingEventResponse {
    private String id;
    private String trackingNumber;
    private PackageStatus status;
    private String location;
    private String remarks;
    private LocalDateTime timestamp;

    public TrackingEventResponse() {
    }

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

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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
