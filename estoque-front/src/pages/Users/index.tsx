import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../services/api";

type User = {
  id: string;
  name: string;
  email: string;
  type: "ADMIN" | "GERENTE" | "FUNCIONARIO";
};

type UserPayload = Omit<User, "id"> & { id?: string };

import UserForm from "./UserForm";
import UserTable from "./UserTable";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(false);

  // 🔹 Carregar usuários
  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await api.get("/users");
        setUsers(response.data);
      } catch (err) {
        console.error("Erro ao carregar usuários:", err);
      }
    }
    loadUsers();
  }, []);

  // 🔹 Criar ou atualizar
  async function handleSave(userData: UserPayload) {
    try {
      if (userData.id) {
        // UPDATE
        const { id, ...data } = userData;
        const response = await api.put(`/users/${id}`, data);
        setUsers(prev =>
          prev.map(u => (u.id === id ? response.data : u))
        );
      } else {
        // CREATE
        const response = await api.post("/users", userData);
        setUsers(prev => [...prev, response.data]);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Erro ao salvar usuário");
        console.error("STATUS:", err.response?.status);
        console.error("DATA:", err.response?.data);
      } else {
        console.error("Erro inesperado:", err);
      }
    } finally {
      setEditingUser(null);
      setShowForm(false);
    }
  }

  // 🔹 Editar
  function handleEdit(user: User) {
    setEditingUser(user);
    setShowForm(true);
  }

  // 🔹 Excluir
  async function handleDelete(id: string) {
    try {
      await api.delete(`/users/${id}`);
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (err) {
      console.error("Erro ao excluir usuário:", err);
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Usuários</h1>

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4"
        onClick={() => {
          setEditingUser(null);
          setShowForm(true);
        }}
      >
        Novo Usuário
      </button>

      {showForm && (
        <UserForm
          user={editingUser ?? undefined}
          onSubmit={handleSave}
          onCancel={() => {
            setEditingUser(null);
            setShowForm(false);
          }}
        />
      )}

      <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
