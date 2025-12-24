package com.dto;


import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreditCreateRequest {

    @NotBlank
    private String clientId;

    @NotNull
    @Positive
    private Double requestAmount;

    @NotNull
    @Positive
    private Integer tenureMonths;

    @NotBlank
    private String purpose;

}

