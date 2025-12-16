import { useContext, useState } from "react";
import type { FormEvent } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/users/login", { email, password });
      const { token } = response.data;
      login(token);
      navigate("/dashboard");
    } catch {
      setError("Email ou senha inválidos");
    }
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-600">
      <div className="bg-white shadow-2xl rounded-xl p-6 w-full max-w-[280px] mx-2">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Bem-vindo
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Email</label>
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
            <label className="block text-gray-700 mb-1 font-medium">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
