export interface LoginUser {
  sub: string;
  username: string;
  password: string;
  exp: number;
}

export interface AuthContextType {
  user: LoginUser | null;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => void;
  register: (credentials: {
    username: string;
    email: string;
    password: string;
  }) => Promise<void>;
  loading: boolean;
}
