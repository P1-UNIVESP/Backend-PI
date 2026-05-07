import { Request, Response } from "express";

import { ListPlotOwnerHistoriesUseCase } from "../../../application/usecases/plot-owner-history/list-plot-owner-histories-use-case";
import { ListPlotOwnerHistoriesQuery } from "../../validators/plot-owner-history/list-plot-owner-histories-query-schema";

export class ListPlotOwnerHistoriesController {
  async handle(req: Request, res: Response) {
    const { limit, offset, q, plotId, ownerId, active } =
      req.query as unknown as ListPlotOwnerHistoriesQuery;

    const listPlotOwnerHistoriesUseCase = new ListPlotOwnerHistoriesUseCase();
    const result = await listPlotOwnerHistoriesUseCase.execute({
      limit,
      offset,
      q,
      plotId,
      ownerId,
      active,
    });

    return res.status(200).json(result);
  }
}
