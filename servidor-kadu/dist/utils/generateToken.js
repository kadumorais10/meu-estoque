"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateToken(id, type) {
    const secret = process.env.JWT_SECRET || "dev-secret";
    return jsonwebtoken_1.default.sign({ id, type }, secret, { expiresIn: "7d" });
}
