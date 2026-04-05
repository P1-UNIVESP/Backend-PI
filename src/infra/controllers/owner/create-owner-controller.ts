import { Request, Response } from "express";

import { CreateOwnerUseCase } from "../../../application/usecases/owner/create-owner-use-case";
import { CreateOwnerBody } from "../../validators/owner/create-owner-body-schema";

export class CreateOwnerController {
  async handle(req: Request, res: Response) {
    const { name, cpf, phone } = req.body as CreateOwnerBody;

    const createOwnerUseCase = new CreateOwnerUseCase();

    const owner = await createOwnerUseCase.execute({
      name,
      cpf,
      phone,
    });

    return res.status(201).json(owner);
  }
}
