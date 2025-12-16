import { Router } from "express";
import { movementsController } from "../controllers/MovementsController";
import { authMiddleware } from "../middlewares/auth.middleware";
import { permissionMiddleware } from "../middlewares/permission.middleware";
import { UserType } from "@prisma/client";

const router = Router();

// Criar movimentação
router.post("/", authMiddleware, 
     permissionMiddleware([
    UserType.ADMIN,
    UserType.GERENTE,
    UserType.OPERADOR,
  ]),
    movementsController.create);

// Listar movimentações por produto
router.get(
  "/product/:productId",
  authMiddleware,
  movementsController.listByProduct
);

export default router;
