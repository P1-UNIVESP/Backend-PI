import { Request, Response } from "express";

import { UpdateOwnerUseCase } from "../../../application/usecases/owner/update-owner-use-case";
import { UpdateOwnerBody } from "../../validators/owner/update-owner-body-schema";

export class UpdateOwnerController {
  async handle(req: Request, res: Response) {
    const id = String(req.params.id);
    const { name, cpf, phone } = req.body as UpdateOwnerBody;

    const updateOwnerUseCase = new UpdateOwnerUseCase();

    const owner = await updateOwnerUseCase.execute({
      id,
      name,
      cpf,
      phone,
    });

    return res.status(200).json(owner);
  }
}
