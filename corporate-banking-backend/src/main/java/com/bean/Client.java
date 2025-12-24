package com.bean;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "clients")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Client {
    @Id
    private String id;
    private String companyName;
    private String industry;
    private String address;
    private PrimaryContact primaryContact;
    private double annualTurnover;
    private boolean documentsSubmitted;
    private String rmId;


    public Boolean getDocumentsSubmitted() {
        return documentsSubmitted;
    }
}

