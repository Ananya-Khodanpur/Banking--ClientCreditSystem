package com.bean;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ClientTest {

    @Test
    void shouldCreateClient() {
        // Arrange & Act
        Client client = new Client();
        client.setId("1");
        client.setCompanyName("Test Client Corp");
        client.setIndustry("Technology");
        client.setAddress("123 Test Street");
        client.setAnnualTurnover(1000000.0);
        client.setDocumentsSubmitted(true);
        client.setRmId("rm123");

        // Assert
        assertEquals("1", client.getId());
        assertEquals("Test Client Corp", client.getCompanyName());
        assertEquals("Technology", client.getIndustry());
        assertEquals("123 Test Street", client.getAddress());
        assertEquals(1000000.0, client.getAnnualTurnover(), 0.01);
        assertTrue(client.getDocumentsSubmitted());
        assertEquals("rm123", client.getRmId());
    }

    @Test
    void shouldHandleDocumentsSubmittedStatus() {
        Client clientWithDocs = new Client();
        clientWithDocs.setDocumentsSubmitted(true);
        assertTrue(clientWithDocs.getDocumentsSubmitted());

        Client clientWithoutDocs = new Client();
        clientWithoutDocs.setDocumentsSubmitted(false);
        assertFalse(clientWithoutDocs.getDocumentsSubmitted());
    }

    @Test
    void shouldHandleAnnualTurnover() {
        Client client = new Client();
        client.setAnnualTurnover(500000.0);
        assertEquals(500000.0, client.getAnnualTurnover(), 0.01);

        client.setAnnualTurnover(0.0);
        assertEquals(0.0, client.getAnnualTurnover(), 0.01);
    }

    @Test
    void shouldHandleRmId() {
        Client client = new Client();
        client.setRmId("rm123");
        assertEquals("rm123", client.getRmId());

        client.setRmId("rm456");
        assertEquals("rm456", client.getRmId());
    }

    @Test
    void shouldHandleIndustryTypes() {
        Client techClient = new Client();
        techClient.setIndustry("Technology");
        assertEquals("Technology", techClient.getIndustry());

        Client financeClient = new Client();
        financeClient.setIndustry("Finance");
        assertEquals("Finance", financeClient.getIndustry());

        Client healthcareClient = new Client();
        healthcareClient.setIndustry("Healthcare");
        assertEquals("Healthcare", healthcareClient.getIndustry());
    }
}
