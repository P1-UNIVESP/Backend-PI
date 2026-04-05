import { Request, Response } from "express";

import { DeleteBurialUseCase } from "../../../application/usecases/burial/delete-burial-use-case";

export class DeleteBurialController {
  async handle(req: Request, res: Response) {
    const id = String(req.params.id);

    const deleteBurialUseCase = new DeleteBurialUseCase();

    const result = await deleteBurialUseCase.execute({ id });

    return res.status(200).json(result);
  }
}
