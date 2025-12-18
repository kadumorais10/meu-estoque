import { Router } from "express";
import { userController } from "../controllers/UsersController";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

// Verificar primeiro acesso (pública)
router.get("/check-first-access", userController.checkFirstAccess);

// Criar usuário
router.post("/register", userController.register);

// Login
router.post("/login", userController.login);

// Rota protegida de exemplo
router.get("/me", authMiddleware, (req: any, res) => {
  res.json({ user: req.user });
});

// Deletar usuário (protegida)
router.delete("/:id", authMiddleware, userController.delete);

export default router;
