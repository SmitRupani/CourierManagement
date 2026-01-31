package com.courier.org.controller;

import com.courier.org.model.Hub;
import com.courier.org.service.HubService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/hubs")
public class HubController {
    private final HubService hubService;

    public HubController(HubService hubService) {
        this.hubService = hubService;
    }

    @GetMapping
    public ResponseEntity<List<Hub>> getAllHubs() {
        return ResponseEntity.ok(hubService.getAllHubs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Hub> getHubById(@PathVariable String id) {
        return ResponseEntity.ok(hubService.getHubById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Hub> createHub(@RequestBody Hub hub) {
        return ResponseEntity.ok(hubService.createHub(hub));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Hub> updateHub(@PathVariable String id, @RequestBody Hub hub) {
        return ResponseEntity.ok(hubService.updateHub(id, hub));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteHub(@PathVariable String id) {
        hubService.deleteHub(id);
        return ResponseEntity.noContent().build();
    }
}
