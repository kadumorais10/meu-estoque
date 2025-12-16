"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsersController_1 = require("../controllers/UsersController");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// Criar usuário
router.post("/register", UsersController_1.userController.register);
// Login
router.post("/login", UsersController_1.userController.login);
// Rota protegida de exemplo
router.get("/me", auth_middleware_1.authMiddleware, (req, res) => {
    res.json({ user: req.user });
});
exports.default = router;
