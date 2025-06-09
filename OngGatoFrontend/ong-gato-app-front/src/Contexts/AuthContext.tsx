import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../API/user";

type AuthContextType = {
  user: User | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {

  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && localStorage.getItem('token')) {
      return JSON.parse(storedUser);
    }
    return null;
  });

  const login = (userData: User, token: string) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};