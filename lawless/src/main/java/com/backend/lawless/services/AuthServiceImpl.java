package com.backend.lawless.services;

import com.backend.lawless.daos.RoleRepository;
import com.backend.lawless.daos.UserRepository;
import com.backend.lawless.dtos.parts.UserPersonalData;
import com.backend.lawless.dtos.requests.LoginRequest;
import com.backend.lawless.dtos.requests.RegisterRequest;
import com.backend.lawless.dtos.responses.LoginResponse;
import com.backend.lawless.dtos.responses.RegisterResponse;
import com.backend.lawless.entities.ERole;
import com.backend.lawless.entities.Role;
import com.backend.lawless.entities.User;
import com.backend.lawless.exceptions.LawlessException;
import com.backend.lawless.security.jwt.JwtUtils;
import com.backend.lawless.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtils jwtUtils;


    @Override
    public RegisterResponse register(RegisterRequest registerRequest) throws LawlessException {
        if (userRepository.existsByUsername(registerRequest.getUserPersonalData().getUsername())) {
            throw new LawlessException("Error: Username is already taken!");
        }

        if (userRepository.existsByEmail(registerRequest.getUserPersonalData().getEmail())) {
            throw new LawlessException("Error: Email is already taken!");
        }

        User user = new User(registerRequest.getUserPersonalData().getUsername(),
                registerRequest.getUserPersonalData().getFirstName(),
                registerRequest.getUserPersonalData().getLastName(),
                registerRequest.getUserPersonalData().getEmail(),
                encoder.encode(registerRequest.getPassword()));


        List<Role> roles = new ArrayList<>();

        Role userRole = roleRepository.findByName(ERole.ROLE_USER);
        if (userRole == null) throw new LawlessException("Error: Role is not found.");
        roles.add(userRole);

        user.setRoles(roles);
        userRepository.save(user);

        return new RegisterResponse("Registration successful!");
    }

    @Override
    public LoginResponse login(LoginRequest loginRequest) throws LawlessException {
        String username;
        if (!"".equals(loginRequest.getEmail())) {
            username = userRepository.findByEmail(loginRequest.getEmail()).getUsername();
        } else {
            username = loginRequest.getUsername();
        }
        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, loginRequest.getPassword()));
        } catch (AuthenticationException e) {
            throw new LawlessException(e.getMessage());
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User user = userRepository.findByUsername(userDetails.getUsername());

        return new LoginResponse(jwtUtils.generateJwtToken(user.getUsername()),
                new UserPersonalData(user.getUsername(),
                        user.getEmail(),
                        user.getFirstName(),
                        user.getLastName()));
    }
}
