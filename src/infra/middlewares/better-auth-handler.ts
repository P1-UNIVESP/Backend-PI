import { NextFunction, Request, Response } from "express";
import { toNodeHandler } from "better-auth/node";

import { auth } from "../../lib/auth";
const handler = toNodeHandler(auth);

export async function betterAuthHandler(req: Request, res: Response, next: NextFunction) {
  try {
    return await handler(req, res);
  } catch (error) {
    return next(error);
  }
}
