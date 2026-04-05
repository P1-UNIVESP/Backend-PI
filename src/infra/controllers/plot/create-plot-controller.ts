import { Request, Response } from "express";

import { CreatePlotUseCase } from "../../../application/usecases/plot/create-plot-use-case";
import { CreatePlotBody } from "../../validators/plot/create-plot-body-schema";

export class CreatePlotController {
  async handle(req: Request, res: Response) {
    const { code, type, status, capacity, ownerId } = req.body as CreatePlotBody;

    const createPlotUseCase = new CreatePlotUseCase();

    const plot = await createPlotUseCase.execute({
      code,
      type,
      status,
      capacity,
      ownerId,
    });

    return res.status(201).json(plot);
  }
}
