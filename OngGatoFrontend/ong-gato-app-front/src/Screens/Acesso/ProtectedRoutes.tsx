import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext"

export function ProtectedRoutes() {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/access/login" />;
}
