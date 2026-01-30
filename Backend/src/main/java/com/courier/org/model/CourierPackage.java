package com.courier.org.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

import lombok.Data;

@Data
@Document(collection = "packages")
public class CourierPackage {

    @Id
    private String id;

    @Indexed(unique = true)
    private String trackingNumber;

    private String userId;
    private String assignedCourierId;

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
    private String deliveryOtp;

    public CourierPackage() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.status = PackageStatus.CREATED;
        this.paid = false;
    }
}
