package com.courier.org.repository;

import com.courier.org.model.TrackingEvent;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrackingEventRepository extends MongoRepository<TrackingEvent, String> {
    List<TrackingEvent> findByPackageIdOrderByTimestampDesc(String packageId);

    List<TrackingEvent> findByTrackingNumberOrderByTimestampDesc(String trackingNumber);
}
