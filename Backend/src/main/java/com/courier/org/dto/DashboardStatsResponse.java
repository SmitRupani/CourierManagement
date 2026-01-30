package com.courier.org.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DashboardStatsResponse {
    private long totalPackages;
    private long createdPackages;
    private long inTransitPackages;
    private long deliveredPackages;
    private long cancelledPackages;
    private long totalUsers;
    private long totalCustomers;
    private long totalCouriers;
    private List<PackagesByStatusDto> packagesByStatus;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PackagesByStatusDto {
        private String status;
        private long count;
    }
}
