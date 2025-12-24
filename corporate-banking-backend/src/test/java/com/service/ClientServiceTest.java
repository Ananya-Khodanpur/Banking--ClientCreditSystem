package com.service;

import com.bean.Client;
import com.bean.PrimaryContact;
import com.dto.ClientRequest;
import com.dto.ClientResponse;
import com.repository.ClientRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

@MockitoSettings(strictness = Strictness.LENIENT)
@ExtendWith(MockitoExtension.class)
class ClientServiceTest {


    @Mock
    private ClientRepository repo;

    @InjectMocks
    private ClientService service;

    @BeforeEach
    void setupSecurityContext() {
        Authentication auth = mock(Authentication.class);
        when(auth.getName()).thenReturn("rm1");

        SecurityContext context = mock(SecurityContext.class);
        when(context.getAuthentication()).thenReturn(auth);

        SecurityContextHolder.setContext(context);
    }

    private ClientRequest mockRequest() {
        ClientRequest req = new ClientRequest();
        req.setCompanyName("Corp Ltd");
        req.setIndustry("IT");
        req.setAddress("Bangalore");
        req.setAnnualTurnover(1_000_000.0);
        req.setDocumentsSubmitted(true);
        req.setContactName("John");
        req.setContactEmail("john@test.com");
        req.setContactPhone("9999999999");
        return req;
    }

    private Client mockClient(String rmId) {
        Client c = new Client();
        c.setId("1");
        c.setCompanyName("Corp Ltd");
        c.setIndustry("IT");
        c.setAddress("Bangalore");
        c.setAnnualTurnover(1000000);
        c.setDocumentsSubmitted(true);
        c.setRmId(rmId);

        PrimaryContact pc = new PrimaryContact();
        pc.setName("John");
        pc.setEmail("john@test.com");
        pc.setPhone("9999999999");

        c.setPrimaryContact(pc);
        return c;
    }

    /* ================= CREATE CLIENT ================= */

    @Test
    void createClient_success() {
        ClientRequest req = mockRequest();

        when(repo.save(any(Client.class))).thenAnswer(i -> i.getArgument(0));

        ClientResponse response = service.createClient(req);

        assertNotNull(response);
        assertEquals("Corp Ltd", response.getCompanyName());
        assertEquals("rm1", response.getRmId());
        verify(repo, times(1)).save(any(Client.class));
    }

    /* ================= GET MY CLIENTS ================= */

    @Test
    void getMyClients_success() {
        when(repo.findByRmId("rm1"))
                .thenReturn(List.of(mockClient("rm1")));

        List<ClientResponse> list = service.getMyClients();

        assertEquals(1, list.size());
        assertEquals("Corp Ltd", list.get(0).getCompanyName());
    }

    /* ================= GET CLIENT BY ID ================= */

    @Test
    void getClientById_success_whenOwner() {
        when(repo.findById("1"))
                .thenReturn(Optional.of(mockClient("rm1")));

        ClientResponse response = service.getClientById("1");

        assertNotNull(response);
        assertEquals("Corp Ltd", response.getCompanyName());
    }

    @Test
    void getClientById_throwsAccessDenied_whenNotOwner() {
        when(repo.findById("1"))
                .thenReturn(Optional.of(mockClient("rm2")));

        assertThrows(AccessDeniedException.class,
                () -> service.getClientById("1"));
    }

    /* ================= UPDATE CLIENT ================= */

    @Test
    void updateClient_success() {
        Client client = mockClient("rm1");
        when(repo.findById("1")).thenReturn(Optional.of(client));
        when(repo.save(any(Client.class))).thenReturn(client);

        ClientRequest req = mockRequest();
        req.setCompanyName("Updated Corp");

        ClientResponse response = service.updateClient("1", req);

        assertEquals("Updated Corp", response.getCompanyName());
        verify(repo).save(client);
    }

    @Test
    void updateClient_denied_whenNotOwner() {
        when(repo.findById("1"))
                .thenReturn(Optional.of(mockClient("rm2")));

        assertThrows(AccessDeniedException.class,
                () -> service.updateClient("1", mockRequest()));
    }

    /* ================= GET CLIENTS FOR RM ================= */

    @Test
    void getClientsForRM_success() {
        when(repo.findAll()).thenReturn(List.of(mockClient("rm1")));

        Object result = service.getClientsForRM();

        assertNotNull(result);
        assertTrue(result instanceof List);
        assertEquals(1, ((List<?>) result).size());
    }
}
