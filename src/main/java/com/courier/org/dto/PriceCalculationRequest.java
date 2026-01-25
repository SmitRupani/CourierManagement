package com.courier.org.dto;

import com.courier.org.model.PackageType;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PriceCalculationRequest {
    private Double weight;
    private PackageType packageType;
}
