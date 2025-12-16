// src/types/User.ts

export type UserType = "ADMIN" | "GERENTE" | "FUNCIONARIO";

export interface User {
  id: string;
  name: string;
  email: string;
  type: UserType;
}
