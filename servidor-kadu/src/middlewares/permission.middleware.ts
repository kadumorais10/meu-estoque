import { Request, Response, NextFunction } from "express";
import { UserType } from "@prisma/client";

export function permissionMiddleware(allowed: UserType[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user || !user.type) {
      return res.status(403).json({ error: "Acesso negado." });
    }

    if (!allowed.includes(user.type)) {
      return res.status(403).json({
        error: "Você não tem permissão para acessar este recurso.",
      });
    }

    next();
  };
}
