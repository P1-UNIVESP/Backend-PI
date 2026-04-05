import { Request, Response } from "express";

import { GetPlotUseCase } from "../../../application/usecases/plot/get-plot-use-case";

export class GetPlotController {
  async handle(req: Request, res: Response) {
    const id = String(req.params.id);

    const getPlotUseCase = new GetPlotUseCase();

    const plot = await getPlotUseCase.execute({ id });

    return res.status(200).json(plot);
  }
}
