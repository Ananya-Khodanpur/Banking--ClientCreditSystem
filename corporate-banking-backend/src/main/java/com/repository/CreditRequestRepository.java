package com.repository;

import com.bean.CreditRequest;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CreditRequestRepository extends MongoRepository<CreditRequest, String> {
    List<CreditRequest> findBySubmittedBy(String submittedBy);
}

