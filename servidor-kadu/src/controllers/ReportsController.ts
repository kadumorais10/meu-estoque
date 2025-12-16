import { Request, Response } from "express";
import { reportsService } from "../services/ReportsService";

class ReportsController {
  async lowStock(req: Request, res: Response) {
    try {
      const products = await reportsService.lowStock();
      res.json(products);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async stockSummary(req: Request, res: Response) {
  try {
    const summary = await reportsService.stockSummary();
    res.json(summary);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

  async movements(req: Request, res: Response) {
  try {
    const data = await reportsService.movements();
    res.json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}


}

export const reportsController = new ReportsController();
