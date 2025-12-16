import { useState } from "react";

type User = {
  id?: string;
  name: string;
  email: string;
  type: "ADMIN" | "GERENTE" | "FUNCIONARIO";
};

type Props = {
  user?: User;
  onSubmit: (user: User) => void;
  onCancel: () => void;
};

export default function UserForm({ user, onSubmit, onCancel }: Props) {
  // 🔹 Inicializa o form já com o usuário (se houver)
  const [form, setForm] = useState<User>({
    id: user?.id,
    name: user?.name ?? "",
    email: user?.email ?? "",
    type: user?.type ?? "FUNCIONARIO",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded mb-6">
      <div className="mb-4">
        <label className="block font-medium mb-1">Nome</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Tipo</label>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="ADMIN">Admin</option>
          <option value="GERENTE">Gerente</option>
          <option value="FUNCIONARIO">Funcionário</option>
        </select>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          {user ? "Atualizar" : "Criar"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
