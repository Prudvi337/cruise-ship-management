import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

// Define user roles
export type UserRole = "voyager" | "admin" | "manager" | "headcook" | "supervisor";

// Define user interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// Mock user data (in a real application, this would come from Firebase)
const mockUsers = [
  {
    id: "1",
    name: "John Voyager",
    email: "voyager@cruise.com",
    password: "password123",
    role: "voyager" as UserRole,
  },
  {
    id: "2",
    name: "Admin User",
    email: "admin@cruise.com",
    password: "password123",
    role: "admin" as UserRole,
  },
  {
    id: "3",
    name: "Manager User",
    email: "manager@cruise.com",
    password: "password123",
    role: "manager" as UserRole,
  },
  {
    id: "4",
    name: "Head Cook",
    email: "cook@cruise.com",
    password: "password123",
    role: "headcook" as UserRole,
  },
  {
    id: "5",
    name: "Supervisor",
    email: "supervisor@cruise.com",
    password: "password123",
    role: "supervisor" as UserRole,
  },
];

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem("cruise_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication (replace with Firebase Auth in a real application)
    const foundUser = mockUsers.find((u) => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("cruise_user", JSON.stringify(userWithoutPassword));
      toast({
        title: "Login Successful",
        description: `Welcome back, ${userWithoutPassword.name}!`,
      });
      console.log(`User ${email} logged in successfully as ${userWithoutPassword.role}`);
      return true;
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      console.log(`Failed login attempt for ${email}`);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("cruise_user");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    console.log("User logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
