import { Request, Response } from "express";

import { GetOwnerUseCase } from "../../../application/usecases/owner/get-owner-use-case";

export class GetOwnerController {
  async handle(req: Request, res: Response) {
    const id = String(req.params.id);

    const getOwnerUseCase = new GetOwnerUseCase();

    const owner = await getOwnerUseCase.execute({ id });

    return res.status(200).json(owner);
  }
}
