package com.courier.org.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

import lombok.Data;

@Data
@Document(collection = "notifications")
public class Notification {

    @Id
    private String id;
    private String recipient;
    private String subject;
    private String body;
    private LocalDateTime timestamp;

    public Notification() {
        this.timestamp = LocalDateTime.now();
    }

    public Notification(String recipient, String subject, String body) {
        this.recipient = recipient;
        this.subject = subject;
        this.body = body;
        this.timestamp = LocalDateTime.now();
    }
}
