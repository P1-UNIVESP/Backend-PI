import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import { AppError } from "../errors/app-error";

export function validateQuery<T>(schema: ZodType<T>) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const parseResult = schema.safeParse(req.query);

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

      throw new AppError("Parametros de query invalidos", 400, fieldErrors);
    }

    Object.defineProperty(req, "query", {
      value: parseResult.data,
      writable: true,
      configurable: true,
    });

    next();
  };
}
