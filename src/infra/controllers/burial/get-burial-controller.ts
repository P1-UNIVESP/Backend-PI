import { Request, Response } from "express";

import { GetBurialUseCase } from "../../../application/usecases/burial/get-burial-use-case";

export class GetBurialController {
  async handle(req: Request, res: Response) {
    const id = String(req.params.id);

    const getBurialUseCase = new GetBurialUseCase();

    const burial = await getBurialUseCase.execute({ id });

    return res.status(200).json(burial);
  }
}
