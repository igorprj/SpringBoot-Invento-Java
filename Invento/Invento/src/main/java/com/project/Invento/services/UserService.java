package com.project.Invento.services;

import com.project.Invento.dtos.UserRequestDTO;
import com.project.Invento.dtos.UserResponseDTO;
import com.project.Invento.models.User;
import com.project.Invento.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public UserResponseDTO createUser(UserRequestDTO userRequestDTO) {
        User user = new User();

        updatedEntity(user,  userRequestDTO);

        User saved = userRepository.save(user);

        return toDTO(saved);
    }

    public List<UserResponseDTO> getAllUsers() {
        List<User> users = userRepository.findAll();

        return users.stream()
                .map(this::toDTO)
                .toList();
    }

    public UserResponseDTO getById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found!"));

        return toDTO(user);
    }

    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found!"));

        userRepository.delete(user);
    }

    public UserResponseDTO updateUser(Long id, UserRequestDTO userRequestDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found!"));

        updatedEntity(user,  userRequestDTO);
        User saved = userRepository.save(user);

        return toDTO(saved);
    }

    private void updatedEntity(User user, UserRequestDTO dto) {
        user.setName(dto.name());
        user.setEmail(dto.email());
        user.setPassword(passwordEncoder.encode(dto.password()));
    }

    private UserResponseDTO toDTO(User user){
        UserResponseDTO dto = new UserResponseDTO(
                user.getName(),
                user.getEmail(),
                user.getPassword()
        );

        return dto;
    }
}
