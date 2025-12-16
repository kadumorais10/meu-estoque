import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export function Header() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();         // limpa token/estado do usuário
    navigate("/");    // redireciona para a tela de login
  }

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800">Meu Estoque</h1>
      <button
        onClick={handleLogout}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
      >
        Sair
      </button>
    </header>
  );
}
