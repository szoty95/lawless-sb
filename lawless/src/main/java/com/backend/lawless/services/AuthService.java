package com.backend.lawless.services;

import com.backend.lawless.dtos.requests.LoginRequest;
import com.backend.lawless.dtos.requests.RegisterRequest;
import com.backend.lawless.dtos.responses.LoginResponse;
import com.backend.lawless.dtos.responses.RegisterResponse;
import com.backend.lawless.dtos.responses.UserResponse;
import com.backend.lawless.exceptions.LawlessException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {
    RegisterResponse register(RegisterRequest registerRequest) throws LawlessException;

    LoginResponse login(LoginRequest loginRequest) throws LawlessException;

    UserResponse getUser(UserDetails userDetails) throws LawlessException;
}
