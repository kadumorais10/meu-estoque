import { useState } from "react";
import type { MovementType } from "../../types/Movement";

type Props = {
  onSubmit: (data: {
    type: MovementType;
    quantity: number;
    reason: string;
  }) => void;
  onCancel: () => void;
};

export default function MovementForm({ onSubmit, onCancel }: Props) {
  const [type, setType] = useState<MovementType>("IN");
  const [quantity, setQuantity] = useState(0);
  const [reason, setReason] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    onSubmit({
      type,
      quantity,
      reason,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Movimentar estoque</h3>

      <select
        value={type}
        onChange={(e) => setType(e.target.value as MovementType)}
      >
        <option value="IN">Entrada</option>
        <option value="OUT">Saída</option>
        <option value="ADJUST">Ajuste</option>
        <option value="LOSS">Perda</option>
      </select>

      <input
        type="number"
        placeholder="Quantidade"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />

      <input
        placeholder="Motivo"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />

      <button type="submit">Salvar</button>
      <button type="button" onClick={onCancel}>
        Cancelar
      </button>
    </form>
  );
}
