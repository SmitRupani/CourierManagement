package com.courier.org.dto;

import com.courier.org.model.PackageType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PriceCalculationResponse {
    private Double weight;
    private PackageType packageType;
    private Double basePrice;
    private Double weightCharge;
    private Double totalAmount;
}
