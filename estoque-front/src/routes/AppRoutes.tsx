import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products/index";
import Movements from "../pages/Movements";
import Users from "../pages/Users";

import { PrivateRoute } from "../components/PrivateRoute";
import AdminRoute from "../components/AdminRoute";
import { AppLayout } from "../layouts/AppLayout";

export function AppRoutes() {
  return (
    <Routes>
      {/* públicas */}
      <Route path="/login" element={<Login />} />

      {/* privadas */}
      <Route element={<PrivateRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id/movements" element={<Movements />} />

          {/* rota de admin */}
          <Route element={<AdminRoute />}>
            <Route path="/users" element={<Users />} />
          </Route>
        </Route>
      </Route>

      {/* catch-all */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
