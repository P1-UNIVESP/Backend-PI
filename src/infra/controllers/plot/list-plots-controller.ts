import { Request, Response } from "express";

import { ListPlotsUseCase } from "../../../application/usecases/plot/list-plots-use-case";
import { ListPlotsQuery } from "../../validators/plot/list-plots-query-schema";

export class ListPlotsController {
  async handle(req: Request, res: Response) {
    const { limit, offset, q, status, type } = req.query as unknown as ListPlotsQuery;

    const listPlotsUseCase = new ListPlotsUseCase();

    const result = await listPlotsUseCase.execute({ limit, offset, q, status, type });

    return res.status(200).json(result);
  }
}
