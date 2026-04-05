import { Request, Response } from "express";

import { UpdatePlotUseCase } from "../../../application/usecases/plot/update-plot-use-case";
import { UpdatePlotBody } from "../../validators/plot/update-plot-body-schema";

export class UpdatePlotController {
  async handle(req: Request, res: Response) {
    const id = String(req.params.id);
    const { code, type, status, capacity, ownerId } = req.body as UpdatePlotBody;

    const updatePlotUseCase = new UpdatePlotUseCase();

    const plot = await updatePlotUseCase.execute({
      id,
      code,
      type,
      status,
      capacity,
      ownerId,
    });

    return res.status(200).json(plot);
  }
}
