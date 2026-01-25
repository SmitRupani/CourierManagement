package com.courier.org.dto;

import com.courier.org.model.PackageType;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreatePackageRequest {

    @Valid
    @NotNull(message = "Sender details are required")
    private SenderDetailsDto sender;

    @Valid
    @NotNull(message = "Receiver details are required")
    private ReceiverDetailsDto receiver;

    @NotNull(message = "Package type is required")
    private PackageType packageType;

    @NotNull(message = "Weight is required")
    @Positive(message = "Weight must be positive")
    private Double weight;

    private String description;

    @Data
    public static class SenderDetailsDto {
        @NotBlank(message = "Sender name is required")
        private String name;
        @NotBlank(message = "Sender phone is required")
        private String phone;
        private String email;
        @Valid
        @NotNull(message = "Sender address is required")
        private AddressDto address;
    }

    @Data
    public static class ReceiverDetailsDto {
        @NotBlank(message = "Receiver name is required")
        private String name;
        @NotBlank(message = "Receiver phone is required")
        private String phone;
        private String email;
        @Valid
        @NotNull(message = "Receiver address is required")
        private AddressDto address;
    }

    @Data
    public static class AddressDto {
        @NotBlank(message = "Address line 1 is required")
        private String line1;
        private String line2;
        @NotBlank(message = "City is required")
        private String city;
        @NotBlank(message = "State is required")
        private String state;
        @NotBlank(message = "Country is required")
        private String country;
        @NotBlank(message = "Pincode is required")
        private String pincode;
    }
}
