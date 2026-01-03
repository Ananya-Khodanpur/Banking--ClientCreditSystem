package com.service;

import com.bean.CreditRequest;
import com.dto.CreditResponseRequest;
import com.dto.CreditUpdateRequest;
import com.repository.CreditRequestRepository;
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

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

@MockitoSettings(strictness = Strictness.LENIENT)
@ExtendWith(MockitoExtension.class)
class CreditRequestServiceTest {

    @Mock
    private CreditRequestRepository repo;

    @InjectMocks
    private CreditRequestService service;

    @BeforeEach
    void setupSecurityContext() {
        Authentication auth = mock(Authentication.class);
        when(auth.getName()).thenReturn("rm1");

        SecurityContext context = mock(SecurityContext.class);
        when(context.getAuthentication()).thenReturn(auth);

        SecurityContextHolder.setContext(context);
    }

    private CreditResponseRequest mockRequest() {
        CreditResponseRequest req = new CreditResponseRequest();
        req.setClientId("client123");
        req.setRequestAmount(500000.0);
        req.setTenureMonths(24);
        req.setPurpose("Working capital");
        req.setRemarks("Urgent requirement");
        return req;
    }

    private CreditRequest mockCreditRequest(String rmId) {
        CreditRequest cr = new CreditRequest();
        cr.setId("cr123");
        cr.setClientId("client123");
        cr.setSubmittedBy(rmId);
        cr.setRequestAmount(500000.0);
        cr.setTenureMonths(24);
        cr.setPurpose("Working capital");
        cr.setRemarks("Urgent requirement");
        cr.setStatus("Pending");
        cr.setCreatedAt(Date.from(Instant.now()));
        return cr;
    }

    /* ================= CREATE CREDIT REQUEST ================= */

    @Test
    void createCreditRequest_success() {
        CreditResponseRequest req = mockRequest();
        
        when(repo.save(any(CreditRequest.class))).thenAnswer(i -> {
            CreditRequest saved = i.getArgument(0);
            saved.setId("cr123");
            saved.setCreatedAt(new Date());
            return saved;
        });

        CreditResponseRequest response = service.create(req);

        assertNotNull(response);
        assertEquals("client123", response.getClientId());
        assertEquals("rm1", response.getSubmittedBy());
        assertEquals(500000.0, response.getRequestAmount());
        assertEquals("Pending", response.getStatus());
        verify(repo, times(1)).save(any(CreditRequest.class));
    }

    /* ================= GET ALL CREDIT REQUESTS ================= */

    @Test
    void getAll_success_forRM() {
        when(repo.findBySubmittedBy("rm1"))
                .thenReturn(List.of(mockCreditRequest("rm1")));

        List<CreditResponseRequest> list = service.getAll();

        assertEquals(1, list.size());
        assertEquals("client123", list.get(0).getClientId());
        assertEquals("rm1", list.get(0).getSubmittedBy());
        assertEquals(500000.0, list.get(0).getRequestAmount());
    }

    @Test
    void getAll_returnsEmptyList_whenNoRequests() {
        when(repo.findBySubmittedBy("rm1")).thenReturn(List.of());

        List<CreditResponseRequest> list = service.getAll();

        assertTrue(list.isEmpty());
    }

    /* ================= GET CREDIT REQUEST BY ID ================= */

    @Test
    void getById_success_whenOwner() {
        when(repo.findById("cr123"))
                .thenReturn(Optional.of(mockCreditRequest("rm1")));

        CreditResponseRequest response = service.getById("cr123");

        assertNotNull(response);
        assertEquals("cr123", response.getId());
        assertEquals("rm1", response.getSubmittedBy());
    }

    @Test
    void getById_throwsAccessDenied_whenNotOwner() {
        when(repo.findById("cr123"))
                .thenReturn(Optional.of(mockCreditRequest("rm2")));

        assertThrows(AccessDeniedException.class, () -> {
            service.getById("cr123");
        });
    }

    @Test
    void getById_throwsException_whenNotFound() {
        when(repo.findById("cr123"))
                .thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> {
            service.getById("cr123");
        });
    }

    /* ================= UPDATE CREDIT REQUEST ================= */

    @Test
    void updateCreditRequest_success() {
        CreditRequest existing = mockCreditRequest("rm1");
        when(repo.findById("cr123")).thenReturn(Optional.of(existing));
        when(repo.save(any(CreditRequest.class))).thenReturn(existing);

        CreditUpdateRequest req = new CreditUpdateRequest();
        req.setStatus("APPROVED");
        req.setRemarks("Approved after review");

        CreditResponseRequest response = service.update("cr123", req);

        assertEquals("APPROVED", response.getStatus());
        assertEquals("Approved after review", response.getRemarks());
        verify(repo).save(existing);
    }

    @Test
    void updateCreditRequest_throwsException_whenNotFound() {
        // Arrange
        when(repo.findById("cr123"))
                .thenReturn(Optional.empty());
        CreditUpdateRequest req = new CreditUpdateRequest();

        // Act & Assert
        assertThrows(RuntimeException.class, () -> {
            service.update("cr123", req);
        });
    }

    /* ================= EDGE CASES ================= */

    @Test
    void createCreditRequest_withNullPurpose() {
        CreditResponseRequest req = mockRequest();
        req.setPurpose(null);
        
        when(repo.save(any(CreditRequest.class))).thenAnswer(i -> i.getArgument(0));

        CreditResponseRequest response = service.create(req);

        assertNotNull(response);
        assertNull(response.getPurpose());
        verify(repo).save(any(CreditRequest.class));
    }

    @Test
    void createCreditRequest_withZeroAmount() {
        CreditResponseRequest req = mockRequest();
        req.setRequestAmount(0.0);
        
        when(repo.save(any(CreditRequest.class))).thenAnswer(i -> i.getArgument(0));

        CreditResponseRequest response = service.create(req);

        assertNotNull(response);
        assertEquals(0.0, response.getRequestAmount());
        verify(repo).save(any(CreditRequest.class));
    }

    @Test
    void createCreditRequest_withMaxTenure() {
        CreditResponseRequest req = mockRequest();
        req.setTenureMonths(360);
        
        when(repo.save(any(CreditRequest.class))).thenAnswer(i -> i.getArgument(0));

        CreditResponseRequest response = service.create(req);

        assertNotNull(response);
        assertEquals(360, response.getTenureMonths());
        verify(repo).save(any(CreditRequest.class));
    }
}
