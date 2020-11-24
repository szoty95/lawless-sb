package com.backend.lawless.services;

import com.backend.lawless.dtos.requests.CaffDetailsRequest;
import com.backend.lawless.dtos.requests.CreateCaffRequest;
import com.backend.lawless.dtos.requests.DeleteCaffRequest;
import com.backend.lawless.dtos.requests.UpdateCaffRequest;
import com.backend.lawless.dtos.responses.CaffDetailsResponse;
import com.backend.lawless.dtos.responses.CreateCaffResponse;
import com.backend.lawless.dtos.responses.DeleteCaffResponse;
import com.backend.lawless.dtos.responses.UpdateCaffResponse;
import com.backend.lawless.exceptions.LawlessException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public interface CaffService {
    CreateCaffResponse create(UserDetails userDetails, CreateCaffRequest request) throws LawlessException;
    UpdateCaffResponse update(UserDetails userDetails, UpdateCaffRequest request) throws LawlessException;
    DeleteCaffResponse delete(UserDetails userDetails, DeleteCaffRequest request) throws LawlessException;
    CaffDetailsResponse details(CaffDetailsRequest request) throws LawlessException;
}
