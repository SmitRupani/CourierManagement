package com.courier.org.service;

import com.courier.org.exception.ResourceNotFoundException;
import com.courier.org.model.Hub;
import com.courier.org.repository.HubRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HubService {
    private final HubRepository hubRepository;

    public HubService(HubRepository hubRepository) {
        this.hubRepository = hubRepository;
    }

    public List<Hub> getAllHubs() {
        return hubRepository.findAll();
    }

    public Hub getHubById(String id) {
        return hubRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hub not found with id: " + id));
    }

    public Hub createHub(Hub hub) {
        return hubRepository.save(hub);
    }

    public Hub updateHub(String id, Hub hubDetails) {
        Hub hub = getHubById(id);
        hub.setName(hubDetails.getName());
        hub.setLocation(hubDetails.getLocation());
        hub.setAddress(hubDetails.getAddress());
        hub.setCapacity(hubDetails.getCapacity());
        hub.setCurrentLoad(hubDetails.getCurrentLoad());
        hub.setManagerName(hubDetails.getManagerName());
        hub.setManagerPhone(hubDetails.getManagerPhone());
        hub.setActive(hubDetails.isActive());
        return hubRepository.save(hub);
    }

    public void deleteHub(String id) {
        Hub hub = getHubById(id);
        hubRepository.delete(hub);
    }
}
