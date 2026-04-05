import cors from "cors";
import express, { Request, Response } from "express";
import { prisma } from "./lib/prisma";
import { errorHandler } from "./infra/middlewares/error-handler";
import { routes } from "./routes";

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());
app.use(routes);

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ message: "API Express com TypeScript funcionando!" });
});

app.get("/health/db", async (_req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: "ok", database: "connected" });
  } catch {
    res.status(500).json({ status: "error", database: "disconnected" });
  }
});

app.use(errorHandler);

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
