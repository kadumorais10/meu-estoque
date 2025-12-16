import { Request, Response } from "express";
import { userService } from "../services/UsersService";

class UserController {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password, type } = req.body;

      const user = await userService.register(name, email, password, type);

      res.status(201).json(user);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
      console.log("erro de registro"+err);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const result = await userService.login(email, password);

      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await userService.deleteUser(Number(id));
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}

export const userController = new UserController();
