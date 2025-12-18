import { useState } from "react";
import type { FormEvent } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function FirstAccess() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres");
      return;
    }

    try {
      await api.post("/users/register", {
        name,
        email,
        password,
        type: "ADMIN",
      });
      navigate("/login");
    } catch {
      setError("Erro ao cadastrar usuário");
    }
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-600">
      <div className="bg-white shadow-2xl rounded-xl p-6 w-full max-w-[320px] mx-2">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Primeiro Acesso
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Crie o primeiro usuário administrador do sistema
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome completo"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Confirmar Senha
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="********"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition duration-200 shadow-md hover:shadow-lg"
          >
            Criar Administrador
          </button>
        </form>
      </div>
    </div>
  );
}
