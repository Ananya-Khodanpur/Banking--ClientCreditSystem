package com.controller;

import com.dto.*;
import com.service.CreditRequestService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/credit-requests")
public class CreditRequestController {

    private final CreditRequestService service;

    public CreditRequestController(CreditRequestService service) {
        this.service = service;
    }

    @PreAuthorize("hasRole('RM')")
    @PostMapping
    public CreditResponseRequest create(
            @Valid @RequestBody CreditResponseRequest dto) {
        return service.create(dto);
    }

    @GetMapping
    public List<CreditResponseRequest> list() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public CreditResponseRequest get(@PathVariable String id) {
        return service.getById(id);
    }

    @PreAuthorize("hasRole('ANALYST')")
    @PutMapping("/{id}")
    @CrossOrigin
    public CreditResponseRequest update(
            @PathVariable String id,
            @Valid @RequestBody CreditUpdateRequest dto) {
        return service.update(id, dto);
    }
}
