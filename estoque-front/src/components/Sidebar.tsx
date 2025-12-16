// src/components/Sidebar.tsx
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function Sidebar() {
  const { user } = useContext(AuthContext);

  const menuItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Produtos", path: "/products" },
  ];

  // Só adiciona a aba de Users se o usuário for ADMIN
  if (user && user.type === "ADMIN") {
    menuItems.push({ label: "Usuários", path: "/users" });
  }

  return (
    <nav className="flex flex-col p-6 space-y-4">
      {menuItems.map(item => (
        <a
          key={item.path}
          href={item.path}
          className="text-gray-700 hover:text-white hover:bg-blue-600 rounded-md px-3 py-2 transition-colors"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
