import { createContext, useContext, useState, ReactNode, useEffect } from "react";
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

    useEffect(() => {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    }, [])

    const [user, setUser] = useState<User>();

    const login = (userData: User) => {
      setUser(userData)
    }

    const logout = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
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