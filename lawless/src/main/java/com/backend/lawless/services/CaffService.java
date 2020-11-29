package com.backend.lawless.services;

import com.backend.lawless.dtos.requests.*;
import com.backend.lawless.dtos.responses.*;
import com.backend.lawless.exceptions.LawlessException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public interface CaffService {
    CreateCaffResponse create(UserDetails userDetails, CreateCaffRequest request, MultipartFile caffFile) throws LawlessException, IOException;
    UpdateCaffResponse update(UserDetails userDetails, UpdateCaffRequest request) throws LawlessException;
    DeleteCaffResponse delete(UserDetails userDetails, DeleteCaffRequest request) throws LawlessException;
    DetailsCaffResponse details(DetailsCaffRequest request) throws LawlessException;
    DetailsAllCaffResponse detailsAll() throws LawlessException;
    CommentAddCaffResponse commentAdd(UserDetails userDetails, CommentAddCaffRequest request) throws LawlessException;
}
