package com.courier.org.dto;

public class CustomerStatsResponse {
    private String userId;
    private long totalPackages;
    private long createdPackages;
    private long deliveredPackages;
    private long inTransitPackages;
    private long cancelledPackages;

    public CustomerStatsResponse() {
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
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

    public long getDeliveredPackages() {
        return deliveredPackages;
    }

    public void setDeliveredPackages(long deliveredPackages) {
        this.deliveredPackages = deliveredPackages;
    }

    public long getInTransitPackages() {
        return inTransitPackages;
    }

    public void setInTransitPackages(long inTransitPackages) {
        this.inTransitPackages = inTransitPackages;
    }

    public long getCancelledPackages() {
        return cancelledPackages;
    }

    public void setCancelledPackages(long cancelledPackages) {
        this.cancelledPackages = cancelledPackages;
    }
}
