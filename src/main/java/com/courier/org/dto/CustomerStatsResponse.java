package com.courier.org.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CustomerStatsResponse {
    private String userId;
    private long totalPackages;
    private long createdPackages;
    private long deliveredPackages;
    private long inTransitPackages;
    private long cancelledPackages;
}
