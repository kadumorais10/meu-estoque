import { prisma } from "../prisma/client";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";
import { UserType } from "@prisma/client";

class UserService {
  async register(
    name: string,
    email: string,
    password: string,
    type: UserType
  ) {
    const exists = await prisma.user.findUnique({ where: { email } });

    if (exists) throw new Error("Email já cadastrado.");

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        type,
      },
    });

    return user;
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) throw new Error("Credenciais inválidas.");

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new Error("Credenciais inválidas.");

    const token = generateToken(user.id, user.type);

    return { token, user };
  }

  async deleteUser(id: number) {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) throw new Error("Usuário não encontrado.");

    await prisma.user.delete({ where: { id } });

    return { message: "Usuário deletado com sucesso." };
  }

  async checkFirstAccess() {
    const userCount = await prisma.user.count();
    return userCount === 0;
  }
}

export const userService = new UserService();
