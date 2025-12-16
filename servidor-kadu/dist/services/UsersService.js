"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const client_1 = require("../prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_1 = require("../utils/generateToken");
class UserService {
    async register(name, email, password, type) {
        const exists = await client_1.prisma.user.findUnique({ where: { email } });
        if (exists)
            throw new Error("Email já cadastrado.");
        const hashed = await bcryptjs_1.default.hash(password, 10);
        const user = await client_1.prisma.user.create({
            data: {
                name,
                email,
                password: hashed,
                type,
            },
        });
        return user;
    }
    async login(email, password) {
        const user = await client_1.prisma.user.findUnique({ where: { email } });
        if (!user)
            throw new Error("Credenciais inválidas.");
        const ok = await bcryptjs_1.default.compare(password, user.password);
        if (!ok)
            throw new Error("Credenciais inválidas.");
        const token = (0, generateToken_1.generateToken)(user.id, user.type);
        return { token, user };
    }
}
exports.userService = new UserService();
