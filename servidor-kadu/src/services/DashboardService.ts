import { prisma } from "../prisma/client";

class DashboardService {
  async summary() {
    const totalProducts = await prisma.product.count();

    const lowStock = await prisma.product.count({
      where: {
        quantity: {
          lt: 5, // depois usamos min_quantity
        },
      },
    });

    const totalItems = await prisma.product.aggregate({
      _sum: {
        quantity: true,
      },
    });

    return {
      totalProducts,
      lowStock,
      totalItems: totalItems._sum.quantity ?? 0,
    };
  }
}

export const dashboardService = new DashboardService();
