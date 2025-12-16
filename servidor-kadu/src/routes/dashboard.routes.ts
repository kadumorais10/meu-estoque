import { Router } from "express";
import { dashboardController } from "../controllers/DashboardController";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/summary", authMiddleware, dashboardController.summary);

export default router;
