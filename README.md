# 🚚 Courier Management System (CMS) - Professional Backend

A production-grade, secure, and scalable Courier Management System built with **Spring Boot**, **MongoDB**, and **Kafka**. This project is designed to handle complex logistics operations including package tracking, dynamic pricing, role-based access control, and real-time notifications.

---

## 🌟 Key Features

### 👤 User Management & Security

- **JWT Authentication & Authorization**: Secure login and registration with stateless token-based authentication.
- **Role-Based Access Control (RBAC)**: Distinct permissions for **Admin**, **Courier**, and **Customer**.
- **Input Validation**: Strict request validation using Jakarta Validation API.

### 📦 Core Logistics & Domain APIs

- **Full CRUD Support**: Complete lifecycle management of courier packages.
- **Dynamic Pricing Engine**: Automatic price calculation based on weight and service type (Normal, Speed, Express, Overnight).
- **Secure OTP Delivery**: 6-digit OTP verification required for successful delivery completion.
- **Real-time Tracking**: Detailed event logging for every package movement.

### 🚀 Advanced Backend Features

- **Complex Queries**: Advanced package search with multi-criteria filtering (Status, Weight range, User ID).
- **Pagination & Sorting**: High-performance data retrieval for all list APIs.
- **Rate Limiting**: Integrated `Bucket4j` for protecting APIs against brute-force and DDoS attacks.
- **Caching**: Optimized performance with Spring Cache abstractions for analytics and frequently accessed data.
- **File Upload**: Support for uploading package-related documents or images.
- **Global Exception Handling**: Standardized error responses across the entire system.

### 🔗 Integrations & Advanced Tech

- **Kafka Event-Driven Architecture**: Decoupled notification service and package event tracking using Apache Kafka.
- **Email Integration**: Automated SMTP-based email notifications for booking confirmation and OTPs.
- **Swagger/OpenAPI**: Fully documented RESTful APIs for easy frontend integration.
- **Dockerized**: Simplified deployment with Docker and Docker Compose.

---

## 🛠️ Technology Stack

| Component               | Technology              |
| :---------------------- | :---------------------- |
| **Backend Framework**   | Spring Boot 3.2.2       |
| **Database**            | MongoDB (NoSQL)         |
| **Messaging/Event Bus** | Apache Kafka            |
| **Security**            | Spring Security + JWT   |
| **Documentation**       | Swagger / OpenAPI 3     |
| **Build Tool**          | Maven                   |
| **Containerization**    | Docker & Docker Compose |

---

## 🏗️ Architecture

The project follows a modular and industry-standard **MVC Architecture**:

```text
src/main/java/com/courier/org/
├── config/       # Security, Caching, Rate Limiting & Filter configs
├── controller/   # REST Controllers (No business logic)
├── service/      # Business logic implementation
├── repository/   # Data access layer (MongoDB)
├── model/        # Domain entities/models
├── dto/          # Data Transfer Objects for API requests/responses
├── exception/    # Custom exceptions & Global Exception Handler
└── util/         # Helper classes and static utilities
```

---

## 🚀 Getting Started

### Prerequisites

- Java 17+
- Docker & Docker Compose
- Maven (optional, if running locally)

### Quick Start with Docker

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project root
cd CourierManagement

# Start all services (App, MongoDB, Kafka, Zookeeper)
docker-compose up -d
```

### Running Locally

1. Configure your `.env` or update `application.yaml` with your MongoDB and Mail credentials.
2. Run the application:
   ```bash
   mvn spring-boot:run
   ```

---

## 📖 API Documentation

Once the application is running, you can access the interactive Swagger documentation at:
🔗 **[http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)**

---

## ✨ Unique Features

- **Kafka-based Notifications**: Even if the mail server is slow, the application remains responsive as emails are processed asynchronously.
- **OTP-Secured Deliveries**: Prevents fraudulent deliveries by requiring a system-generated OTP verified at the point of delivery.
- **Actuator Health Monitoring**: Integrated Spring Boot Actuator for real-time health checks and performance monitoring.
- **Dynamic Dashboard**: Real-time analytics for admins to track system-wide logistics performance.

---

## 👥 Contributors

- Ritesh Prajapati

---

_Developed as a Final Term Project for Backend Engineering with Spring Boot._
