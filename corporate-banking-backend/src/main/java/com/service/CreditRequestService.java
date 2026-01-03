package com.service;

import com.bean.CreditRequest;
import com.dto.*;
import com.repository.CreditRequestRepository;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.List;

@Service
public class CreditRequestService {

    private final CreditRequestRepository repo;

    public CreditRequestService(CreditRequestRepository repo) {
        this.repo = repo;
    }

    // RM creates credit request
    public CreditResponseRequest create(CreditResponseRequest dto) {

        String rm = SecurityContextHolder.getContext()
                .getAuthentication().getName();

        CreditRequest cr = new CreditRequest();
        cr.setClientId(dto.getClientId());
        cr.setSubmittedBy(rm);
        cr.setRequestAmount(dto.getRequestAmount());
        cr.setTenureMonths(dto.getTenureMonths());
        cr.setPurpose(dto.getPurpose());
        cr.setStatus("Pending");
        cr.setRemarks("");
        cr.setCreatedAt(Date.from(Instant.now()));

        repo.save(cr);
        return toResponse(cr);
    }

    // RM → own | Analyst → all
    public List<CreditResponseRequest> getAll() {

        var auth = SecurityContextHolder.getContext().getAuthentication();
        boolean isAnalyst = auth.getAuthorities()
                .stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ANALYST"));

        List<CreditRequest> list =
                isAnalyst ? repo.findAll()
                        : repo.findBySubmittedBy(auth.getName());

        return list.stream()
                .map(this::toResponse)
                .toList();
    }

    public CreditResponseRequest getById(String id) {

        CreditRequest cr = repo.findById(id).orElseThrow();

        validateAccess(cr);
        return toResponse(cr);
    }

    // Analyst updates status
    public CreditResponseRequest update(String id, CreditUpdateRequest dto) {

        CreditRequest cr = repo.findById(id).orElseThrow();

        cr.setStatus(dto.getStatus());
        cr.setRemarks(dto.getRemarks());

        repo.save(cr);
        return toResponse(cr);
    }

    private void validateAccess(CreditRequest cr) {

        var auth = SecurityContextHolder.getContext().getAuthentication();
        boolean isAnalyst = auth.getAuthorities()
                .stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ANALYST"));

        if (!isAnalyst && !cr.getSubmittedBy().equals(auth.getName())) {
            throw new AccessDeniedException("Not allowed");
        }
    }

    private CreditResponseRequest toResponse(CreditRequest c) {

        CreditResponseRequest r = new CreditResponseRequest();
        r.setId(c.getId());
        r.setClientId(c.getClientId());
        r.setSubmittedBy(c.getSubmittedBy());
        r.setRequestAmount(c.getRequestAmount());
        r.setTenureMonths(c.getTenureMonths());
        r.setPurpose(c.getPurpose());
        r.setStatus(c.getStatus());
        r.setRemarks(c.getRemarks());
        r.setCreatedAt(c.getCreatedAt().toInstant());

        return r;
    }
}
