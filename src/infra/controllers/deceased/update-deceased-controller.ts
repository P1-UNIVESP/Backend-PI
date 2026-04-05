import { Request, Response } from "express";

import { UpdateDeceasedUseCase } from "../../../application/usecases/deceased/update-deceased-use-case";
import { UpdateDeceasedBody } from "../../validators/deceased/update-deceased-body-schema";

export class UpdateDeceasedController {
  async handle(req: Request, res: Response) {
    const id = String(req.params.id);
    const { name, birthDate, deathDate, deathCertificate } = req.body as UpdateDeceasedBody;

    const updateDeceasedUseCase = new UpdateDeceasedUseCase();

    const deceased = await updateDeceasedUseCase.execute({
      id,
      name,
      birthDate: birthDate ? new Date(birthDate) : undefined,
      deathDate: deathDate ? new Date(deathDate) : undefined,
      deathCertificate,
    });

    return res.status(200).json(deceased);
  }
}
