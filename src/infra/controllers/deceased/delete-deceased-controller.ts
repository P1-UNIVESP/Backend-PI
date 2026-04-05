import { Request, Response } from "express";

import { DeleteDeceasedUseCase } from "../../../application/usecases/deceased/delete-deceased-use-case";

export class DeleteDeceasedController {
  async handle(req: Request, res: Response) {
    const id = String(req.params.id);

    const deleteDeceasedUseCase = new DeleteDeceasedUseCase();

    const result = await deleteDeceasedUseCase.execute({ id });

    return res.status(200).json(result);
  }
}
