import { createContext } from "react";



export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);
interface AuthContextType {
  token: string | null;
  user?: {
    type: "ADMIN" | "GERENTE" | "USER";
    name: string;
  };
  login: (token: string) => void;
  logout: () => void;
}
