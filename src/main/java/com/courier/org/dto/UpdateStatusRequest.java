package com.courier.org.dto;

import com.courier.org.model.PackageStatus;

import jakarta.validation.constraints.NotNull;

public class UpdateStatusRequest {

    @NotNull(message = "Status is required")
    private PackageStatus status;

    private String remarks;
    private String location;

    // Added getter/setter:
public String getLocation() {
    return location;
}

public void setLocation(String location) {
    this.location = location;
}

    public UpdateStatusRequest() {
    }

    public PackageStatus getStatus() {
        return status;
    }

    public void setStatus(PackageStatus status) {
        this.status = status;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
}
