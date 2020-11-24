package com.backend.lawless.controllers;

import com.backend.lawless.dtos.requests.LoginRequest;
import com.backend.lawless.dtos.requests.RegisterRequest;
import com.backend.lawless.dtos.responses.LoginResponse;
import com.backend.lawless.dtos.responses.RegisterResponse;
import com.backend.lawless.dtos.responses.UserResponse;
import com.backend.lawless.exceptions.LawlessException;
import com.backend.lawless.services.AuthServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(value = "/api/auth", name = "Auth")
@Api(tags = "Auth")
public class AuthController {

    @Autowired
    AuthServiceImpl authService;

    @ApiOperation(value = "Register a user", response = RegisterResponse.class, nickname = "register")
    @PostMapping(value = "/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        try {
            return ResponseEntity.ok(authService.register(registerRequest));
        } catch (LawlessException e) {
            return ResponseEntity
                    .badRequest()
                    .body(e);
        }
    }

    @PostMapping(value = "/login")
    @ApiOperation(value = "Login the user", response = LoginResponse.class, nickname = "login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            return ResponseEntity.ok(authService.login(loginRequest));
        } catch (LawlessException e) {
            return ResponseEntity
                    .badRequest()
                    .body(e);
        }
    }

    @GetMapping(value = "/me")
    @ApiOperation(value = "Get the user", response = UserResponse.class, nickname = "me")
    public ResponseEntity<?> getUser(@AuthenticationPrincipal UserDetails userDetails) {
        try {
            return ResponseEntity.ok(authService.getUser(userDetails));
        } catch (LawlessException e) {
            return ResponseEntity
                    .badRequest()
                    .body(e);
        }
    }
}
