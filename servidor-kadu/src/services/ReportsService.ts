import { prisma } from "../prisma/client";

class ReportsService {
  async lowStock() {
    return prisma.product.findMany({
      where: {
        quantity: {
          lte: prisma.product.fields.min_quantity,
        },
      },
      orderBy: {
        quantity: "asc",
      },
    });
  }
 async stockSummary() {
  const totalProducts = await prisma.product.count();

  const totalItems = await prisma.product.aggregate({
    _sum: {
      quantity: true,
    },
  });

  const lowStockCount = await prisma.product.count({
    where: {
      quantity: {
        lte: prisma.product.fields.min_quantity,
      },
    },
  });

  return {
    totalProducts,
    totalItems: totalItems._sum.quantity ?? 0,
    lowStockCount,
  };
}
 async movements() {
  return prisma.stockMovement.findMany({
    orderBy: {
      created_at: "desc",
    },
    include: {
      product: {
        select: {
          name: true,
          sku: true,
        },
      },
    },
  });
}

}

export const reportsService = new ReportsService();
