import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { api } from "../../services/api";
import MovementForm from "./MovementForm";
import MovementTable from "./MovementTable";

import type { Movement, MovementType } from "../../types/Movement";

export default function Movements() {
  const { id } = useParams<{ id: string }>();

  const [movements, setMovements] = useState<Movement[]>([]);
  const [showForm, setShowForm] = useState(false);

  const productId = Number(id);

  useEffect(() => {
    if (!id) return; // ✅ AQUI PODE

    async function loadMovements() {
      try {
        const response = await api.get(`/movements/${productId}`);
        setMovements(response.data);
      } catch (err) {
        console.error("Erro ao carregar movimentações:", err);
      }
    }

    loadMovements();
  }, [id, productId]);

  async function handleCreate(data: {
    type: MovementType;
    quantity: number;
    reason: string;
  }) {
    if (!id) return;

    try {
      const response = await api.post("/movements", {
        productId,
        ...data,
      });

      setMovements(prev => [response.data, ...prev]);
      setShowForm(false);
    } catch (err) {
      console.error("Erro ao criar movimentação:", err);
    }
  }

  if (!id) {
    return <p>Produto não encontrado.</p>;
  }

  return (
    <div>
      <h2>Movimentações do Produto #{productId}</h2>

      <button onClick={() => setShowForm(true)}>
        Nova movimentação
      </button>

      {showForm && (
        <MovementForm
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
        />
      )}

      <MovementTable movements={movements} />
    </div>
  );
}
