export interface UserRequestDTO {
  name?: string;
  email: string;
  password?: string;
}

export interface UserResponseDTO {
  name: string;
  email: string;
}

export interface AuthState {
  token: string | null;
  user: UserResponseDTO | null;
  isAuthenticated: boolean;
}
