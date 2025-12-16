import { Router } from "express";
import { reportsController } from "../controllers/ReportsController";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/low-stock", authMiddleware, reportsController.lowStock);
router.get("/stock-summary", authMiddleware, reportsController.stockSummary);
router.get("/movements", authMiddleware, reportsController.movements);

export default router;
