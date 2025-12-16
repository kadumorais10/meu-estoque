import { useState } from "react";
import type { Product } from "../../types/Product";

type ProductFormProps = {
  product?: Product;
  onSubmit: (product: Omit<Product, "id"> & { id?: string }) => void;
  onCancel: () => void;
};

export default function ProductForm({
  product,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const [form, setForm] = useState<Omit<Product, "id">>({
    name: product?.name ?? "",
    sku: product?.sku ?? "",
    description: product?.description ?? "",
    price: product?.price ?? 0,
    quantity: product?.quantity ?? 0,
    min_quantity: product?.min_quantity ?? 0,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]:
        name === "price" || name.includes("quantity")
          ? Number(value)
          : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    onSubmit({
      ...form,
      id: product?.id, // ⭐ garante UPDATE
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Nome"
      />

      <input
        name="sku"
        value={form.sku}
        onChange={handleChange}
        placeholder="SKU"
        disabled={!!product} // 🔒 SKU não edita
      />

      <input
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
        placeholder="Preço"
      />

      <input
        name="quantity"
        type="number"
        value={form.quantity}
        onChange={handleChange}
        placeholder="Quantidade"
      />

      <input
        name="min_quantity"
        type="number"
        value={form.min_quantity}
        onChange={handleChange}
        placeholder="Qtd mínima"
      />

      <input
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Descrição"
      />

      <button type="submit">
        {product ? "Atualizar" : "Criar"}
      </button>

      <button type="button" onClick={onCancel}>
        Cancelar
      </button>
    </form>
  );
}
