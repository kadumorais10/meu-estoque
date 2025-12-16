import type { Product } from "../../types/Product";

type Props = {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onMovements: (productId: string) => void;
};

export default function ProductTable({
  products,
  onEdit,
  onDelete,
  onMovements,
}: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>SKU</th>
          <th>Preço</th>
          <th>Qtd</th>
          <th>Ações</th>
        </tr>
      </thead>

      <tbody>
        {products.map(product => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.sku}</td>
            <td>{product.price}</td>
            <td>{product.quantity}</td>

            <td>
              <button onClick={() => onEdit(product)}>
                Editar
              </button>

              <button onClick={() => onDelete(product.id)}>
                Excluir
              </button>

              <button onClick={() => onMovements(product.id)}>
                Movimentações
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

