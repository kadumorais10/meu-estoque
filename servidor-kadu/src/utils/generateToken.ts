import jwt from "jsonwebtoken";

export function generateToken(id: number, type: string) {
  const secret = process.env.JWT_SECRET || "dev-secret";

  return jwt.sign(
    { id, type },
    secret,
    { expiresIn: "7d" }
  );
}
