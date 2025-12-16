import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../types/Product";
import { api } from "../../services/api";
import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";
import axios from "axios";

/**
 * Payload usado no create e update
 * - id é opcional
 */
type ProductPayload = {
  id?: string;
  name: string;
  sku?: string;
  description?: string;
  price: number;
  quantity: number;
  min_quantity: number;
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate(); // ✅ NAVEGAÇÃO

  // 🔹 Carregar produtos
  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
      }
    }

    loadProducts();
  }, []);

  // 🔹 Criar ou atualizar produto
  async function handleSave(productData: ProductPayload) {
    try {
      if (productData.id) {
        // 🔵 UPDATE (NÃO envia SKU)
        const { id, ...data } = productData;

        const response = await api.put(`/products/${id}`, {
          name: data.name,
          description: data.description,
          price: Number(data.price),
          quantity: Number(data.quantity),
          min_quantity: Number(data.min_quantity),
        });

        setProducts(prev =>
          prev.map(p => (p.id === id ? response.data : p))
        );
      } else {
        // 🟢 CREATE (SKU obrigatório)
        if (!productData.sku) {
          throw new Error("SKU é obrigatório para criar produto");
        }

        const response = await api.post("/products", {
          name: productData.name,
          sku: productData.sku,
          description: productData.description,
          price: Number(productData.price),
          quantity: Number(productData.quantity),
          min_quantity: Number(productData.min_quantity),
        });

        setProducts(prev => [...prev, response.data]);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Erro ao salvar produto");
        console.error("STATUS:", err.response?.status);
        console.error("DATA:", err.response?.data);
      } else {
        console.error("Erro inesperado:", err);
      }
    } finally {
      setEditingProduct(null);
      setShowForm(false);
    }
  }

  // 🔹 Editar
  function handleEdit(product: Product) {
    setEditingProduct(product);
    setShowForm(true);
  }

  // 🔹 Excluir
  async function handleDelete(id: string) {
    try {
      await api.delete(`/products/${id}`);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error("Erro ao excluir produto:", err);
    }
  }

  // 🔹 IR PARA MOVIMENTAÇÕES
  function handleMovements(productId: string) {
    navigate(`/products/${productId}/movements`);
  }

  return (
    <div>
      <h1>Produtos</h1>

      <button
        onClick={() => {
          setEditingProduct(null);
          setShowForm(true);
        }}
      >
        Novo Produto
      </button>

      {showForm && (
        <ProductForm
          product={editingProduct ?? undefined}
          onSubmit={handleSave}
          onCancel={() => {
            setEditingProduct(null);
            setShowForm(false);
          }}
        />
      )}

      <ProductTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onMovements={handleMovements} // ✅ AGORA TEM
      />
    </div>
  );
}
