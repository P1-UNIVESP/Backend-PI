import { Request, Response } from "express";

import { DeleteOwnerUseCase } from "../../../application/usecases/owner/delete-owner-use-case";

export class DeleteOwnerController {
  async handle(req: Request, res: Response) {
    const id = String(req.params.id);

    const deleteOwnerUseCase = new DeleteOwnerUseCase();

    const result = await deleteOwnerUseCase.execute({ id });

    return res.status(200).json(result);
  }
}
