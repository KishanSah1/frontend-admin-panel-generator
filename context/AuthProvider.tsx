"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { AuthContextType, LoginUser } from "../types/auth";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<LoginUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); 

  interface RegisterUser {
    username: string;
    email: string;
    password: string;
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decodedUser = jwtDecode<LoginUser>(storedToken);
        setToken(storedToken);
        setUser(decodedUser);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
      }
    }
    setLoading(false); // Mark loading as complete
  }, []);

  const login = async (credentials: { username: string; password: string }) => {
    const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const res = await axios.post(`${API_URL}/api/v1/auth/login`, credentials);
    console.log(res);
    localStorage.setItem("token", res.data);
    setToken(res.data);
    setUser(jwtDecode<LoginUser>(res.data));
    console.log(user);
  };

  const register = async (credentials: RegisterUser) => {
    const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const res = await axios.post("${API_URL}/api/v1/auth/signup", credentials);
    console.log(res);
    localStorage.setItem("token", res.data);
    setToken(res.data);
    // setUser(jwtDecode<LoginUser>(res.data));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {!loading && children} {/* Prevent rendering children until loading is false */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
