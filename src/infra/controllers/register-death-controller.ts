import { Request, Response } from "express";
import { RegisterDeathUseCase } from "../../application/usecases/register-death-use-case";
import { RegisterDeathBody } from "../validators/register-death-body-schema";

export class RegisterDeathController {
  async handle(req: Request, res: Response) {
    const { name, cause, occurredAt, location } = req.body as RegisterDeathBody;

    const registerDeathUseCase = new RegisterDeathUseCase();

    const death = await registerDeathUseCase.execute({
      name,
      cause,
      occurredAt: new Date(occurredAt),
      location,
    });

    return res.status(201).json(death);
  }
}
