package com.courier.org.dto;

import com.courier.org.model.PackageType;
import jakarta.validation.Valid;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdatePackageRequest {

    @Valid
    private CreatePackageRequest.ReceiverDetailsDto receiver;

    private PackageType packageType;
    private Double weight;
    private String description;
}
