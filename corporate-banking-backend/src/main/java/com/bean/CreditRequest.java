package com.bean;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "creditRequests")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreditRequest {
    @Id
    private String id;
    private String clientId;
    private String submittedBy; // RM id
    private double requestAmount;
    private int tenureMonths;
    private String purpose;
    private String status = "Pending"; // default
    private String remarks;
    private Date createdAt = new Date();
}

