import { prisma } from "../prisma/client";
import { MovementType } from "@prisma/client";

class MovementsService {
  async create(
    productId: number,
    type: MovementType,
    quantity: number,
    reason: string
  ) {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) throw new Error("Produto não encontrado.");
    if (quantity < 0) throw new Error("Quantidade inválida.");

    const previousQuantity = product.quantity;
    let newQuantity = previousQuantity;

    switch (type) {
      case "IN":
        if (quantity <= 0) {
          throw new Error("Quantidade deve ser maior que zero.");
        }
        newQuantity = previousQuantity + quantity;
        break;

      case "OUT":
      case "LOSS":
        if (quantity <= 0) {
          throw new Error("Quantidade deve ser maior que zero.");
        }
        if (previousQuantity < quantity) {
          throw new Error("Estoque insuficiente.");
        }
        newQuantity = previousQuantity - quantity;
        break;

      case "ADJUST":
        // quantity é o valor FINAL do estoque
        newQuantity = quantity;
        break;

      default:
        throw new Error("Tipo de movimentação inválido.");
    }

    // Atualiza estoque
    await prisma.product.update({
      where: { id: productId },
      data: { quantity: newQuantity },
    });

    // Registra movimentação
    const movement = await prisma.stockMovement.create({
      data: {
        product_id: productId,
        type,
        quantity,
        previous_quantity: previousQuantity,
        new_quantity: newQuantity,
        reason,
      },
    });

    return movement;
  }

  async listByProduct(productId: number) {
    return prisma.stockMovement.findMany({
      where: { product_id: productId },
      orderBy: { created_at: "desc" },
    });
  }
}

export const movementsService = new MovementsService();
