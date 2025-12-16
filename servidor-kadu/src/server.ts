import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "./routes/users.routes"; 
import productRoutes from "./routes/products.routes";
import movementsRoutes from "./routes/movements.routes";
import reportsRoutes from "./routes/reports.routes";
import dashboardRoutes from "./routes/dashboard.routes";

console.log("DATABASE_URL:", process.env.DATABASE_URL);




const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => res.json({ ok: true, msg: "API funcionando!" }));

// registrar rotas (iremos criar)
app.use("/users", userRoutes);

app.use("/products", productRoutes);

app.use("/movements", movementsRoutes);

app.use("/reports", reportsRoutes);

app.use("/dashboard", dashboardRoutes);


const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

app.listen(PORT, () => {
  console.log(`Server rodando em http://localhost:${PORT}`);
});
