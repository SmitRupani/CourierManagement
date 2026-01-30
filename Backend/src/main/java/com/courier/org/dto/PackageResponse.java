package com.courier.org.dto;

import com.courier.org.model.*;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class PackageResponse {
    private String id;
    private String trackingNumber;
    private SenderDetails sender;
    private ReceiverDetails receiver;
    private PackageType packageType;
    private Double weight;
    private String description;
    private Double amount;
    private boolean paid;
    private PackageStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime deliveredAt;

    public static PackageResponse fromEntity(CourierPackage pkg) {
        PackageResponse response = new PackageResponse();
        response.setId(pkg.getId());
        response.setTrackingNumber(pkg.getTrackingNumber());
        response.setSender(pkg.getSender());
        response.setReceiver(pkg.getReceiver());
        response.setPackageType(pkg.getPackageType());
        response.setWeight(pkg.getWeight());
        response.setDescription(pkg.getDescription());
        response.setAmount(pkg.getAmount());
        response.setPaid(pkg.isPaid());
        response.setStatus(pkg.getStatus());
        response.setCreatedAt(pkg.getCreatedAt());
        response.setUpdatedAt(pkg.getUpdatedAt());
        response.setDeliveredAt(pkg.getDeliveredAt());
        return response;
    }
}
