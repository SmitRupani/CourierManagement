package com.courier.org.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SenderDetails {
    private String name;
    private String phone;
    private String email;
    private Address address;
}
