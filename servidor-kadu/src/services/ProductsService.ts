import { prisma } from "../prisma/client";

class ProductService {
  async createProduct(
  name: string,
  sku: string,
  description: string,
  price: number,
  quantity: number,
  min_quantity: number
) {
  const exists = await prisma.product.findUnique({ where: { sku } });
  if (exists) throw new Error("SKU já cadastrado.");

  return prisma.product.create({
    data: {
      name,
      sku,
      description,
      price,
      quantity,
      min_quantity,
    },
  });
}


  async getAllProducts() {
    return prisma.product.findMany();
  }

  async getProductById(id: number) {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) throw new Error("Produto não encontrado.");
    return product;
  }

  async updateProduct(
  id: number,
  data: {
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    min_quantity?: number;
  }
) {
  return prisma.product.update({
    where: { id },
    data,
  });
}



  async deleteProduct(id: number) {
    await prisma.product.delete({ where: { id } });
    return { message: "Produto deletado com sucesso." };
  }
}

export const productService = new ProductService();
