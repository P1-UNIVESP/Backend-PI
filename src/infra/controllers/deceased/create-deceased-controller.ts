import { Request, Response } from "express";

import { CreateDeceasedUseCase } from "../../../application/usecases/deceased/create-deceased-use-case";
import { CreateDeceasedBody } from "../../validators/deceased/create-deceased-body-schema";

export class CreateDeceasedController {
  async handle(req: Request, res: Response) {
    const { name, birthDate, deathDate, deathCertificate } = req.body as CreateDeceasedBody;

    const createDeceasedUseCase = new CreateDeceasedUseCase();

    const deceased = await createDeceasedUseCase.execute({
      name,
      birthDate: new Date(birthDate),
      deathDate: new Date(deathDate),
      deathCertificate,
    });

    return res.status(201).json(deceased);
  }
}
