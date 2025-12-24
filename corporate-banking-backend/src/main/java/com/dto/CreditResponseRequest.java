package com.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class CreditResponseRequest {

    private String id;
    private String clientId;
    private String submittedBy;

    private Double requestAmount;
    private Integer tenureMonths;
    private String purpose;

    private String status;
    private String remarks;

    private Instant createdAt;
}
