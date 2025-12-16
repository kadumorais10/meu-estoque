import { Router } from "express";
import { productController } from "../controllers/ProductsController";
import { authMiddleware } from "../middlewares/auth.middleware";
import { permissionMiddleware } from "../middlewares/permission.middleware";
import { UserType } from "@prisma/client";

const router = Router();

// Criar produto
router.post("/", authMiddleware, 
     permissionMiddleware([UserType.ADMIN, UserType.GERENTE]),
     productController.create);

// Listar todos
router.get("/", authMiddleware, productController.getAll);

// Buscar por id
router.get("/:id", authMiddleware, productController.getById);

// Atualizar
router.put("/:id", authMiddleware,
    permissionMiddleware([UserType.ADMIN, UserType.GERENTE]),
    productController.update);

// Deletar
router.delete("/:id", authMiddleware, 
    permissionMiddleware([UserType.ADMIN]),
    productController.delete);

export default router;
