import { Request, Response } from "express";

import { DeletePlotUseCase } from "../../../application/usecases/plot/delete-plot-use-case";

export class DeletePlotController {
  async handle(req: Request, res: Response) {
    const id = String(req.params.id);

    const deletePlotUseCase = new DeletePlotUseCase();

    const result = await deletePlotUseCase.execute({ id });

    return res.status(200).json(result);
  }
}
