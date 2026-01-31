package com.courier.org.repository;

import com.courier.org.model.Hub;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HubRepository extends MongoRepository<Hub, String> {
    Optional<Hub> findByCode(String code);
}
