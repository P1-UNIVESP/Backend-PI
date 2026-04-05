import { Request, Response } from "express";

import { CreateBurialUseCase } from "../../../application/usecases/burial/create-burial-use-case";
import { CreateBurialBody } from "../../validators/burial/create-burial-body-schema";

export class CreateBurialController {
  async handle(req: Request, res: Response) {
    const { burialDate, plotId, deceasedId } = req.body as CreateBurialBody;

    const createBurialUseCase = new CreateBurialUseCase();

    const burial = await createBurialUseCase.execute({
      burialDate: new Date(burialDate),
      plotId,
      deceasedId,
    });

    return res.status(201).json(burial);
  }
}
