package com.project.Invento.controllers;

import com.project.Invento.dtos.UserRequestDTO;
import com.project.Invento.dtos.UserResponseDTO;
import com.project.Invento.security.TokenProvider;
import com.project.Invento.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.token.TokenService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    private final AuthenticationManager authenticationManager;

    private final TokenProvider tokenProvider;

    @GetMapping
    public ResponseEntity<UserResponseDTO> register(@Valid @RequestBody UserRequestDTO userRequestDTO) {
        return ResponseEntity.ok(userService.register(userRequestDTO));
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@Valid @RequestBody UserRequestDTO dto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.email(), dto.password())
        );

        String token = tokenProvider.gerarToken(authentication);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(token);
    }
}
