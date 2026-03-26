import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app-error";

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      details: error.details,
    });
  }

  if (error instanceof Error) {
    return res.status(500).json({
      message: "Erro interno do servidor",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }

  return res.status(500).json({
    message: "Erro interno do servidor",
  });
}
