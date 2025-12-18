import { useEffect, useState, type ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { checkFirstAccess } from "../services/api";

type Props = {
  children: ReactNode;
};

export function FirstAccessCheck({ children }: Props) {
  const [isChecking, setIsChecking] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Se já estiver na página de primeiro acesso, não fazer verificação
    if (location.pathname === "/first-access") {
      setIsChecking(false);
      return;
    }

    async function verifyFirstAccess() {
      try {
        const { isFirstAccess } = await checkFirstAccess();
        if (isFirstAccess) {
          navigate("/first-access", { replace: true });
        } else {
          setIsChecking(false);
        }
      } catch (err) {
        // Em caso de erro, assumir que não é primeiro acesso para não bloquear a aplicação
        console.error("Erro ao verificar primeiro acesso:", err);
        setIsChecking(false);
      }
    }

    verifyFirstAccess();
  }, [navigate, location.pathname]);

  if (isChecking) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-600">
        <div className="text-white text-lg">Carregando...</div>
      </div>
    );
  }

  return <>{children}</>;
}
