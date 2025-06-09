import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

export function AdminRoutes() {
  const { user } = useAuth();

  if (user && user.isAdmin) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />; 
  }
}