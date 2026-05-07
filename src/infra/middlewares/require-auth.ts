import { NextFunction, Request, Response } from "express";
import { fromNodeHeaders } from "better-auth/node";

import { AppError } from "../errors/app-error";
import { auth } from "../../lib/auth";

type AuthSession = {
  session: {
    id: string;
    userId: string;
  };
  user: {
    id: string;
    email: string;
    name: string;
    role?: string | null;
  };
};

async function getSession(req: Request) {
  return auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  }) as Promise<AuthSession | null>;
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const session = await getSession(req);

    if (!session) {
      throw new AppError("Nao autenticado", 401);
    }

    res.locals.auth = session;
    return next();
  } catch (error) {
    return next(error);
  }
}

export async function requireAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const session = await getSession(req);

    if (!session) {
      throw new AppError("Nao autenticado", 401);
    }

    const roles = (session.user.role ?? "user").split(",").map((role) => role.trim());

    if (!roles.includes("admin")) {
      throw new AppError("Acesso permitido apenas para administradores", 403);
    }

    res.locals.auth = session;
    return next();
  } catch (error) {
    return next(error);
  }
}
