import { Request, Response } from "express";

import { GetDeceasedUseCase } from "../../../application/usecases/deceased/get-deceased-use-case";

export class GetDeceasedController {
  async handle(req: Request, res: Response) {
    const id = String(req.params.id);

    const getDeceasedUseCase = new GetDeceasedUseCase();

    const deceased = await getDeceasedUseCase.execute({ id });

    return res.status(200).json(deceased);
  }
}
