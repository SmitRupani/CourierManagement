# Courier Management System (CMS) - Backend 🚚

## 1. Project Description

The **Courier Management System (CMS)** is a production-grade RESTful backend application built with **Spring Boot 3.x** and **MongoDB**. It is designed to manage the end-to-end logistics lifecycle of courier operations, including secure user authentication, package booking, dynamic pricing, automated tracking, and role-based access control.

The system caters to three primary actors:

- **Customers**: Book shipments and track their journey.
- **Couriers**: Handle physical delivery and update shipment status.
- **Admins**: Oversight of the entire system, user management, and courier assignments.

Special emphasis is placed on security with **JWT-based authentication** and a **Secure OTP Handshake** for verified deliveries.

---

## 2. Core Pipelines & Workflows

### A. The End-to-End Delivery Pipeline

This flow describes the journey of a package from booking to the receiver's doorstep:

1.  **Booking (Customer)**: A customer creates a delivery request. The system generates a unique tracking number, calculates the price, and generates a **6-digit secure OTP**.
2.  **Assignment (Admin)**: An administrator reviews the created package and assigns it to an available Courier agent.
3.  **Transit (Courier)**: The agent picks up the package and moves it through various checkpoints (In Transit, Out for Delivery). Each status update is logged as an immutable tracking event.
4.  **Handshake Delivery (Courier + Customer)**: To complete the delivery, the courier must input the 6-digit OTP provided by the customer. This ensures the package is handed over to the right person.
5.  **Completion**: Upon successful OTP verification, the system marks the status as `DELIVERED` and logs the final timestamp.

### B. Secure Tracking Pipeline

Every status change in the system follows this automated path:

- **Trigger**: An API call is made to update a package status.
- **Event Creation**: A `TrackingEvent` is automatically created with the new status, timestamp, location, and remarks.
- **Public Access**: Public users can fetch this history using only the tracking number without needing to log in.

### C. OTP & Notification Pipeline

- **Generation**: Triggered during `POST /api/v1/packages`.
- **Notification**: The system sends an automated email (via Spring Mail) to the customer's registered email address.
- **Simulation Log**: Every outgoing communication is also logged in an internal `notifications` collection for demonstration/audit purposes.

---

## 3. API Structure

### 🔐 Authentication (`/api/v1/auth`)

| Method | Endpoint    | Access | Description                               |
| :----- | :---------- | :----- | :---------------------------------------- |
| `POST` | `/register` | Public | Register a new account (Customer/Courier) |
| `POST` | `/login`    | Public | Login and receive JWT Token               |
| `GET`  | `/me`       | User   | Get current user profile                  |

### 📦 Package Management (`/api/v1/packages`)

| Method  | Endpoint              | Access        | Description                                       |
| :------ | :-------------------- | :------------ | :------------------------------------------------ |
| `POST`  | `/`                   | Customer      | Book a new courier package                        |
| `GET`   | `/{id}`               | User          | Get full package details                          |
| `GET`   | `/track/{trackingNo}` | Public        | Track package (Summary)                           |
| `GET`   | `/my-packages`        | Customer      | List all packages booked by me                    |
| `PATCH` | `/{id}/status`        | Admin/Courier | Update package status (Requires OTP for Delivery) |

### 📍 Tracking & History (`/api/v1/tracking`)

| Method | Endpoint                | Access        | Description                               |
| :----- | :---------------------- | :------------ | :---------------------------------------- |
| `GET`  | `/{trackingNo}/history` | Public        | Get full immutable journey of a package   |
| `POST` | `/{packageId}/event`    | Admin/Courier | Manually add a custom tracking checkpoint |

### 🛠️ Administration (`/api/v1/admin`)

| Method  | Endpoint                | Access | Description                            |
| :------ | :---------------------- | :----- | :------------------------------------- |
| `GET`   | `/users`                | Admin  | List all registered users (Paginated)  |
| `PATCH` | `/packages/{id}/assign` | Admin  | Assign a specific courier to a package |
| `GET`   | `/stats`                | Admin  | Overall system dashboard and analytics |

---

## 4. Tech Stack

- **Framework**: Spring Boot 3.2.2
- **Database**: MongoDB (Atlas)
- **Security**: Spring Security + JJWT
- **Communication**: Spring Mail (SMTP Support)
- **Validation**: Jakarta Validation API
- **Documentation**: Swagger/OpenAPI (Optional)

## 5. Running with Docker (Recommended)

This project uses a **Hermetic Build** process. You do not need Java or Maven installed on your machine to run it, only Docker.

### Prerequisites
1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Setup
1. Clone the repository.
2. Create a `.env` file in the root directory (refer to `.env.example`)

### Run
To start the backend and the database
```bash
docker compose up --build
```

The API will be available at `http://localhost:8080/api/v1`
