import { useEffect, useState } from "react";
import { api } from "../services/api";

interface DashboardData {
  totalProducts: number;
  lowStock: number;
  totalItems: number;
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    api.get("/dashboard/summary").then((response) => {
      setData(response.data);
    });
  }, []);

  if (!data)
    return (
      <div className="flex items-center justify-center min-h-screen pl-64">
        <p className="text-gray-600 text-lg">Carregando...</p>
      </div>
    );

  return (
    <div className="min-h-screen flex justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
      <div className="w-full max-w-4xl p-8 pl-64">
        <div className="bg-white shadow-2xl rounded-xl p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            Dashboard
          </h1>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-500 text-white rounded-lg p-6 shadow-md text-center">
              <h2 className="text-xl font-semibold mb-2">Produtos</h2>
              <p className="text-3xl font-bold">{data.totalProducts}</p>
            </div>
            <div className="bg-yellow-500 text-white rounded-lg p-6 shadow-md text-center">
              <h2 className="text-xl font-semibold mb-2">Baixo estoque</h2>
              <p className="text-3xl font-bold">{data.lowStock}</p>
            </div>
            <div className="bg-green-500 text-white rounded-lg p-6 shadow-md text-center">
              <h2 className="text-xl font-semibold mb-2">Total itens</h2>
              <p className="text-3xl font-bold">{data.totalItems}</p>
            </div>
          </div>

          <div className="text-center text-gray-700">
            <p>
              Aqui você pode acompanhar o status geral do estoque e tomar decisões
              rápidas sobre movimentações e reposições.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
