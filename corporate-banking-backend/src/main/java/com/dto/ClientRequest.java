package com.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClientRequest {

    @NotBlank
    private String companyName;

    @NotBlank
    private String industry;

    private String address;

    @NotBlank
    @Email
    private String contactEmail;

    @NotBlank
    private String contactName;

    @Pattern(regexp = "^[6-9]\\d{9}$", message = "Invalid phone")
    private String contactPhone;

    @NotNull
    @Positive
    private Double annualTurnover;

    private Boolean documentsSubmitted;
}

