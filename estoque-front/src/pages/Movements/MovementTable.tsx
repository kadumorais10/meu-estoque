import type { Movement } from "../../types/Movement";

type Props = {
  movements: Movement[];
};

export default function MovementTable({ movements }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Tipo</th>
          <th>Qtd</th>
          <th>Antes</th>
          <th>Depois</th>
          <th>Motivo</th>
          <th>Data</th>
        </tr>
      </thead>

      <tbody>
        {movements.map(m => (
          <tr key={m.id}>
            <td>{m.type}</td>
            <td>{m.quantity}</td>
            <td>{m.previous_quantity}</td>
            <td>{m.new_quantity}</td>
            <td>{m.reason}</td>
            <td>{new Date(m.created_at).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
