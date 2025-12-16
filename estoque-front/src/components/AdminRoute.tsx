import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function AdminRoute() {
  const { user } = useContext(AuthContext);

  // Se não tiver user ou não for admin, redireciona
  if (!user || user.type !== "ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }

  // Renderiza a rota filha
  return <Outlet />;
}

