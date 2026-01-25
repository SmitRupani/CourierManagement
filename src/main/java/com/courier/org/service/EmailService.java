package com.courier.org.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("cms@example.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }

    public void sendOtpEmail(String to, String trackingNumber, String otp) {
        String subject = "Delivery OTP for your package: " + trackingNumber;
        String body = "Dear Customer,\n\n" +
                "Your package with tracking number " + trackingNumber + " has been booked successfully.\n" +
                "The 6-digit delivery OTP is: " + otp + "\n\n" +
                "Please provide this OTP to the courier at the time of delivery.\n\n" +
                "Thank you for using our service!";
        sendEmail(to, subject, body);
    }
}
