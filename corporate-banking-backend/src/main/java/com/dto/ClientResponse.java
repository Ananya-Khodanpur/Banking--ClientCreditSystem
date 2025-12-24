package com.dto;

import com.bean.PrimaryContact;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClientResponse {

    private String id;
    private String companyName;
    private String industry;
    private String address;

    private PrimaryContact primaryContact;

    private Double annualTurnover;
    private Boolean documentsSubmitted;

    private String rmId;


}
