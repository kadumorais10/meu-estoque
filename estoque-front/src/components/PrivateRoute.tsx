import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function PrivateRoute() {
  const { token } = useContext(AuthContext);

  // Se não estiver logado, redireciona para o login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Se estiver logado, permite acessar a rota
  return <Outlet />;
}
