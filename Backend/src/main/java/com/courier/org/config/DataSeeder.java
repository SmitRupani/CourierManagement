package com.courier.org.config;

import com.courier.org.model.*;
import com.courier.org.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PackageRepository packageRepository;
    private final TrackingEventRepository trackingEventRepository;
    private final HubRepository hubRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            seedUsers();
        }
        if (packageRepository.count() == 0) {
            seedPackages();
        }
        if (hubRepository.count() == 0) {
            seedHubs();
        }
        log.info("Data seeding completed. Users: {}, Packages: {}, Hubs: {}, Events: {}",
                userRepository.count(), packageRepository.count(), hubRepository.count(), trackingEventRepository.count());
    }

    private void seedUsers() {
        log.info("Seeding users...");
        
        // Admin user
        User admin = User.builder()
                .name("Admin User")
                .email("admin@courierpro.com")
                .password(passwordEncoder.encode("admin123"))
                .phone("+91 9876543210")
                .role(Role.ADMIN)
                .active(true)
                .build();
        userRepository.save(admin);

        // Customer users
        User customer1 = User.builder()
                .name("Rahul Sharma")
                .email("rahul@example.com")
                .password(passwordEncoder.encode("password123"))
                .phone("+91 9876543211")
                .role(Role.CUSTOMER)
                .active(true)
                .build();
        userRepository.save(customer1);

        User customer2 = User.builder()
                .name("Priya Patel")
                .email("priya@example.com")
                .password(passwordEncoder.encode("password123"))
                .phone("+91 9876543212")
                .role(Role.CUSTOMER)
                .active(true)
                .build();
        userRepository.save(customer2);

        // Courier users
        User courier1 = User.builder()
                .name("Vikram Singh")
                .email("vikram@courierpro.com")
                .password(passwordEncoder.encode("password123"))
                .phone("+91 9876543213")
                .role(Role.COURIER)
                .active(true)
                .build();
        userRepository.save(courier1);

        User courier2 = User.builder()
                .name("Amit Kumar")
                .email("amit@courierpro.com")
                .password(passwordEncoder.encode("password123"))
                .phone("+91 9876543214")
                .role(Role.COURIER)
                .active(true)
                .build();
        userRepository.save(courier2);

        log.info("Seeded 5 users");
    }

    private void seedPackages() {
        log.info("Seeding packages...");
        
        List<User> customers = userRepository.findAll().stream()
                .filter(u -> u.getRole() == Role.CUSTOMER)
                .toList();
        
        List<User> couriers = userRepository.findAll().stream()
                .filter(u -> u.getRole() == Role.COURIER)
                .toList();

        if (customers.isEmpty()) return;

        // Package data
        String[][] packageData = {
            {"Electronics", "TNA Groups", "Brooklyn, NY", "South Bronx, NY", "1200", "2500.00"},
            {"Logistics", "Gravitas LLC", "Manhattan, NY", "Queens, NY", "650", "1800.00"},
            {"Telecom", "BVI GROUP", "Beverly Hills, LA", "Santa Monica, LA", "1352", "3200.00"},
            {"Sports", "MEGAONE", "Mitte, Berlin", "Kreuzberg, Berlin", "45", "450.00"},
            {"Documents", "Tech Solutions", "Koramangala, Bengaluru", "Indiranagar, Bengaluru", "2", "150.00"},
            {"Fashion", "Style Corp", "Banjara Hills, Hyderabad", "Hitech City, Hyderabad", "5", "350.00"},
            {"Medical", "HealthFirst", "Whitefield, Bengaluru", "MG Road, Bengaluru", "10", "800.00"},
            {"Food", "FreshMart", "Jubilee Hills, Hyderabad", "Gachibowli, Hyderabad", "25", "200.00"},
            {"Furniture", "HomeStyle", "Sector 5, Delhi", "Sector 18, Noida", "150", "5500.00"},
            {"Books", "EduBooks", "Andheri, Mumbai", "Bandra, Mumbai", "8", "120.00"},
        };

        PackageStatus[] statuses = {
            PackageStatus.IN_TRANSIT,
            PackageStatus.PICKED_UP,
            PackageStatus.DELIVERED,
            PackageStatus.IN_TRANSIT,
            PackageStatus.OUT_FOR_DELIVERY,
            PackageStatus.CREATED,
            PackageStatus.IN_TRANSIT,
            PackageStatus.DELIVERED,
            PackageStatus.PICKED_UP,
            PackageStatus.CREATED
        };

        for (int i = 0; i < packageData.length; i++) {
            String[] data = packageData[i];
            User customer = customers.get(i % customers.size());
            User courier = couriers.isEmpty() ? null : couriers.get(i % couriers.size());

            CourierPackage pkg = new CourierPackage();
            pkg.setTrackingNumber(generateTrackingNumber());
            pkg.setUserId(customer.getId());
            pkg.setAssignedCourierId(courier != null ? courier.getId() : null);
            pkg.setDescription(data[0] + " - " + data[1]);
            pkg.setPackageType(PackageType.EXPRESS);
            pkg.setWeight(Double.parseDouble(data[4]));
            pkg.setAmount(Double.parseDouble(data[5]));
            pkg.setPaid(i % 2 == 0);
            pkg.setStatus(statuses[i]);
            pkg.setCreatedAt(LocalDateTime.now().minusDays(10 - i));
            pkg.setUpdatedAt(LocalDateTime.now().minusHours(i * 3));
            
            if (statuses[i] == PackageStatus.DELIVERED) {
                pkg.setDeliveredAt(LocalDateTime.now().minusHours(i));
            }

            // Sender details
            SenderDetails sender = new SenderDetails();
            sender.setName(data[1]);
            sender.setPhone("+91 98765432" + (10 + i));
            sender.setEmail("sender" + i + "@example.com");
            Address senderAddr = new Address();
            senderAddr.setLine1(data[2]);
            senderAddr.setCity(data[2].split(",")[1].trim());
            senderAddr.setState("India");
            senderAddr.setCountry("India");
            senderAddr.setPincode("5000" + (10 + i));
            sender.setAddress(senderAddr);
            pkg.setSender(sender);

            // Receiver details
            ReceiverDetails receiver = new ReceiverDetails();
            receiver.setName("Receiver " + (i + 1));
            receiver.setPhone("+91 98765433" + (10 + i));
            receiver.setEmail("receiver" + i + "@example.com");
            Address receiverAddr = new Address();
            receiverAddr.setLine1(data[3]);
            receiverAddr.setCity(data[3].split(",")[1].trim());
            receiverAddr.setState("India");
            receiverAddr.setCountry("India");
            receiverAddr.setPincode("5001" + (10 + i));
            receiver.setAddress(receiverAddr);
            pkg.setReceiver(receiver);

            packageRepository.save(pkg);

            // Create tracking events
            createTrackingEvents(pkg);
        }

        log.info("Seeded 10 packages with tracking events");
    }

    private void createTrackingEvents(CourierPackage pkg) {
        // Always add CREATED event
        TrackingEvent created = new TrackingEvent(
                pkg.getId(),
                pkg.getTrackingNumber(),
                PackageStatus.CREATED,
                pkg.getSender().getAddress().getCity(),
                "Package created and ready for pickup"
        );
        created.setTimestamp(pkg.getCreatedAt());
        trackingEventRepository.save(created);

        // Add events based on current status
        if (pkg.getStatus().ordinal() >= PackageStatus.PICKED_UP.ordinal()) {
            TrackingEvent pickedUp = new TrackingEvent(
                    pkg.getId(),
                    pkg.getTrackingNumber(),
                    PackageStatus.PICKED_UP,
                    pkg.getSender().getAddress().getCity(),
                    "Package picked up by courier"
            );
            pickedUp.setTimestamp(pkg.getCreatedAt().plusHours(2));
            trackingEventRepository.save(pickedUp);
        }

        if (pkg.getStatus().ordinal() >= PackageStatus.IN_TRANSIT.ordinal()) {
            TrackingEvent inTransit = new TrackingEvent(
                    pkg.getId(),
                    pkg.getTrackingNumber(),
                    PackageStatus.IN_TRANSIT,
                    "Distribution Center",
                    "Package in transit to destination"
            );
            inTransit.setTimestamp(pkg.getCreatedAt().plusHours(6));
            trackingEventRepository.save(inTransit);
        }

        if (pkg.getStatus().ordinal() >= PackageStatus.OUT_FOR_DELIVERY.ordinal()) {
            TrackingEvent outForDelivery = new TrackingEvent(
                    pkg.getId(),
                    pkg.getTrackingNumber(),
                    PackageStatus.OUT_FOR_DELIVERY,
                    pkg.getReceiver().getAddress().getCity(),
                    "Package out for delivery"
            );
            outForDelivery.setTimestamp(pkg.getCreatedAt().plusDays(1));
            trackingEventRepository.save(outForDelivery);
        }

        if (pkg.getStatus() == PackageStatus.DELIVERED) {
            TrackingEvent delivered = new TrackingEvent(
                    pkg.getId(),
                    pkg.getTrackingNumber(),
                    PackageStatus.DELIVERED,
                    pkg.getReceiver().getAddress().getCity(),
                    "Package delivered successfully"
            );
            delivered.setTimestamp(pkg.getDeliveredAt());
            trackingEventRepository.save(delivered);
        }
    }

    private void seedHubs() {
        log.info("Seeding hubs...");
        
        Hub hub1 = Hub.builder()
                .code("HUB-NYC-01")
                .name("Central Distribution Hub")
                .location("New York, NY")
                .capacity(50000L)
                .currentLoad(32450L)
                .managerName("David Smith")
                .managerPhone("+1 (555) 012-3456")
                .active(true)
                .address(new Address("456 Logistics Blvd", "Queens", "New York", "NY", "USA", "11101"))
                .build();
        hubRepository.save(hub1);

        Hub hub2 = Hub.builder()
                .code("HUB-LAX-01")
                .name("West Coast Gateway")
                .location("Los Angeles, CA")
                .capacity(45000L)
                .currentLoad(41200L)
                .managerName("Maria Garcia")
                .managerPhone("+1 (555) 012-7890")
                .active(true)
                .address(new Address("789 Cargo Way", "", "Los Angeles", "CA", "USA", "90045"))
                .build();
        hubRepository.save(hub2);

        Hub hub3 = Hub.builder()
                .code("HUB-CHI-02")
                .name("Midwest Transit Point")
                .location("Chicago, IL")
                .capacity(30000L)
                .currentLoad(15600L)
                .managerName("James Wilson")
                .managerPhone("+1 (555) 012-1111")
                .active(false)
                .address(new Address("123 Transit Rd", "", "Chicago", "IL", "USA", "60666"))
                .build();
        hubRepository.save(hub3);

        log.info("Seeded 3 hubs");
    }

    private String generateTrackingNumber() {
        return "CP" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}
