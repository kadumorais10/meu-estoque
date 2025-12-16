import { defineConfig } from "@prisma/config";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    // aqui é ONDE DEVE IR A URL
    url: process.env.DATABASE_URL!,
  },
});
