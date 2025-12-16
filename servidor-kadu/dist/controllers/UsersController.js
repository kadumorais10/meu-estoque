"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const UsersService_1 = require("../services/UsersService");
class UserController {
    async register(req, res) {
        try {
            const { name, email, password, type } = req.body;
            const user = await UsersService_1.userService.register(name, email, password, type);
            res.status(201).json(user);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
            console.log("erro de registro" + err);
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const result = await UsersService_1.userService.login(email, password);
            res.json(result);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}
exports.userController = new UserController();
