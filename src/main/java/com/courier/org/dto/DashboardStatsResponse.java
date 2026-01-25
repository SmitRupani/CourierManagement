package com.courier.org.dto;

import java.util.List;

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

    public DashboardStatsResponse() {
    }

    public long getTotalPackages() {
        return totalPackages;
    }

    public void setTotalPackages(long totalPackages) {
        this.totalPackages = totalPackages;
    }

    public long getCreatedPackages() {
        return createdPackages;
    }

    public void setCreatedPackages(long createdPackages) {
        this.createdPackages = createdPackages;
    }

    public long getInTransitPackages() {
        return inTransitPackages;
    }

    public void setInTransitPackages(long inTransitPackages) {
        this.inTransitPackages = inTransitPackages;
    }

    public long getDeliveredPackages() {
        return deliveredPackages;
    }

    public void setDeliveredPackages(long deliveredPackages) {
        this.deliveredPackages = deliveredPackages;
    }

    public long getCancelledPackages() {
        return cancelledPackages;
    }

    public void setCancelledPackages(long cancelledPackages) {
        this.cancelledPackages = cancelledPackages;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public long getTotalCustomers() {
        return totalCustomers;
    }

    public void setTotalCustomers(long totalCustomers) {
        this.totalCustomers = totalCustomers;
    }

    public long getTotalCouriers() {
        return totalCouriers;
    }

    public void setTotalCouriers(long totalCouriers) {
        this.totalCouriers = totalCouriers;
    }

    public List<PackagesByStatusDto> getPackagesByStatus() {
        return packagesByStatus;
    }

    public void setPackagesByStatus(List<PackagesByStatusDto> packagesByStatus) {
        this.packagesByStatus = packagesByStatus;
    }

    public static class PackagesByStatusDto {
        private String status;
        private long count;

        public PackagesByStatusDto() {
        }

        public PackagesByStatusDto(String status, long count) {
            this.status = status;
            this.count = count;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public long getCount() {
            return count;
        }

        public void setCount(long count) {
            this.count = count;
        }
    }
}
