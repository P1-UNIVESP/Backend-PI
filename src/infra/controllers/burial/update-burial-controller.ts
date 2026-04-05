import { Request, Response } from "express";

import { UpdateBurialUseCase } from "../../../application/usecases/burial/update-burial-use-case";
import { UpdateBurialBody } from "../../validators/burial/update-burial-body-schema";

export class UpdateBurialController {
  async handle(req: Request, res: Response) {
    const id = String(req.params.id);
    const { burialDate, plotId, deceasedId } = req.body as UpdateBurialBody;

    const updateBurialUseCase = new UpdateBurialUseCase();

    const burial = await updateBurialUseCase.execute({
      id,
      burialDate: burialDate ? new Date(burialDate) : undefined,
      plotId,
      deceasedId,
    });

    return res.status(200).json(burial);
  }
}
