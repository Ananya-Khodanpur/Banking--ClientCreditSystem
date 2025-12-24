package com.controller;

import com.dto.ClientRequest;
import com.dto.ClientResponse;
import com.service.ClientService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ClientController {

    private final ClientService service;

    public ClientController(ClientService service) {
        this.service = service;
    }

    @PreAuthorize("hasRole('RM')")
    @PostMapping("/rm/clients")
    public ClientResponse create(@Valid @RequestBody ClientRequest req) {
        return service.createClient(req);
    }

    @PreAuthorize("hasRole('RM')")
    @GetMapping("/clients")
    public List<ClientResponse> myClients() {
        return service.getMyClients();
    }

    @PreAuthorize("hasRole('RM')")
    @GetMapping("/clients/{id}")
    public ClientResponse get(@PathVariable String id) {
        return service.getClientById(id);
    }

    @PreAuthorize("hasRole('RM')")
    @PutMapping("/clients/{id}")
    public ClientResponse update(
            @PathVariable String id,
            @Valid @RequestBody ClientRequest req) {
        return service.updateClient(id, req);
    }
}
