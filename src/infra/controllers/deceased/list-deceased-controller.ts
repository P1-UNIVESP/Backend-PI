import { Request, Response } from "express";

import { ListDeceasedUseCase } from "../../../application/usecases/deceased/list-deceased-use-case";
import { ListDeceasedQuery } from "../../validators/deceased/list-deceased-query-schema";

export class ListDeceasedController {
  async handle(req: Request, res: Response) {
    const { limit, offset, q } = req.query as unknown as ListDeceasedQuery;

    const listDeceasedUseCase = new ListDeceasedUseCase();

    const result = await listDeceasedUseCase.execute({ limit, offset, q });

    return res.status(200).json(result);
  }
}
