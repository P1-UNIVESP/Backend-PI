import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import { AppError } from "../errors/app-error";

export function validateBody<T>(schema: ZodType<T>) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const parseResult = schema.safeParse(req.body);

    if (!parseResult.success) {
      const fieldErrors = parseResult.error.issues.reduce<Record<string, string[]>>(
        (acc, issue) => {
          const field = issue.path.join(".") || "_global";

          if (!acc[field]) {
            acc[field] = [];
          }

          acc[field].push(issue.message);
          return acc;
        },
        {},
      );

      throw new AppError("Dados invalidos", 400, fieldErrors);
    }

    req.body = parseResult.data;
    next();
  };
}
