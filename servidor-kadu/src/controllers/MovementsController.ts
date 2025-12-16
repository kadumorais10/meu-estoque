import { Request, Response } from "express";
import { movementsService } from "../services/MovementsService";

class MovementsController {
  async create(req: Request, res: Response) {
    try {
      const { productId, type, quantity, reason } = req.body;

      const movement = await movementsService.create(
        Number(productId),
        type,
        Number(quantity),
        reason
      );

      res.status(201).json(movement);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async listByProduct(req: Request, res: Response) {
    try {
      const { productId } = req.params;
      const movements = await movementsService.listByProduct(
        Number(productId)
      );
      res.json(movements);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}

export const movementsController = new MovementsController();
