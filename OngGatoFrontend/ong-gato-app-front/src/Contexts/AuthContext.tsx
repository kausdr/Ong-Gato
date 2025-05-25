import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../API/user";

type AuthContextType = {
  user?: User;
  login: (userData: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: undefined,
  login: () => {},
  logout: () => {},
});

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider = ({ children }:AuthProviderProps) => {
    const [user, setUser] = useState<User>();

    const login = (userData: User) => {
        setUser(userData)
    }

    const logout = () => {
    setUser(undefined);
  };

    return (
    <AuthContext.Provider value={{user, login, logout}}>
        {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
    return useContext(AuthContext)
}