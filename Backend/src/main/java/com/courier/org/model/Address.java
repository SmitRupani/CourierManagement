package com.courier.org.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Address {
    private String line1;
    private String line2;
    private String city;
    private String state;
    private String country;
    private String pincode;
}
