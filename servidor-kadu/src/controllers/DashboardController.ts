import { Request, Response } from "express";
import { dashboardService } from "../services/DashboardService";

class DashboardController {
  async summary(req: Request, res: Response) {
    const data = await dashboardService.summary();
    return res.json(data);
  }
}

export const dashboardController = new DashboardController();
