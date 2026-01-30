package com.courier.org.dto;

import com.courier.org.model.PackageStatus;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdateStatusRequest {
    @NotNull(message = "Status is required")
    private PackageStatus status;

    private String remarks;
    private String location;
    private String otp;
}
