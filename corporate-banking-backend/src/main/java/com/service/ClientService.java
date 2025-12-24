package com.service;



import com.bean.Client;
import com.bean.PrimaryContact;
import com.dto.ClientRequest;
import com.dto.ClientResponse;
import com.repository.ClientRepository;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClientService {

    private final ClientRepository repo;

    public ClientService(ClientRepository repo) {
        this.repo = repo;
    }

    public ClientResponse createClient(ClientRequest req) {

        String rmId = SecurityContextHolder.getContext()
                .getAuthentication().getName();

        Client client = new Client();
        client.setCompanyName(req.getCompanyName());
        client.setIndustry(req.getIndustry());
        client.setAddress(req.getAddress());
        client.setAnnualTurnover(req.getAnnualTurnover());
        client.setDocumentsSubmitted(req.getDocumentsSubmitted());
        client.setRmId(rmId);

        PrimaryContact pc = new PrimaryContact();
        pc.setName(req.getContactName());
        pc.setEmail(req.getContactEmail());
        pc.setPhone(req.getContactPhone());

        client.setPrimaryContact(pc);

        repo.save(client);

        return toResponse(client);
    }

    public List<ClientResponse> getMyClients() {
        String rmId = SecurityContextHolder.getContext()
                .getAuthentication().getName();

        return repo.findByRmId(rmId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public ClientResponse getClientById(String id) {

        Client client = repo.findById(id).orElseThrow();

        validateOwnership(client);

        return toResponse(client);
    }

    public ClientResponse updateClient(String id, ClientRequest req) {

        Client client = repo.findById(id).orElseThrow();

        validateOwnership(client);

        client.setCompanyName(req.getCompanyName());
        client.setIndustry(req.getIndustry());
        client.setAddress(req.getAddress());
        client.setAnnualTurnover(req.getAnnualTurnover());
        client.setDocumentsSubmitted(req.getDocumentsSubmitted());

        PrimaryContact pc = client.getPrimaryContact();
        pc.setName(req.getContactName());
        pc.setEmail(req.getContactEmail());
        pc.setPhone(req.getContactPhone());

        client.setPrimaryContact(pc);

        repo.save(client);

        return toResponse(client);
    }

    private void validateOwnership(Client client) {
        String currentRm = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        if (!client.getRmId().equals(currentRm)) {
            throw new AccessDeniedException("You are not allowed to access this client");
        }
    }

    private ClientResponse toResponse(Client c) {

        ClientResponse r = new ClientResponse();
        r.setId(c.getId());
        r.setCompanyName(c.getCompanyName());
        r.setIndustry(c.getIndustry());
        r.setAddress(c.getAddress());
        r.setPrimaryContact(c.getPrimaryContact());
        r.setAnnualTurnover(c.getAnnualTurnover());
        r.setDocumentsSubmitted(c.getDocumentsSubmitted());
        r.setRmId(c.getRmId());

        return r;
    }

    public Object getClientsForRM() {
        return repo.findAll();
    }
}
