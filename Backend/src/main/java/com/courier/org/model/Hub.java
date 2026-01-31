package com.courier.org.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "hubs")
public class Hub {
    @Id
    private String id;
    
    @Indexed(unique = true)
    private String code;
    
    private String name;
    private String location;
    private Address address;
    private String managerName;
    private String managerPhone;
    
    private Long capacity;
    private Long currentLoad;
    
    @Builder.Default
    private boolean active = true;
}
