import { Request, Response } from "express";

import { ListOwnersUseCase } from "../../../application/usecases/owner/list-owners-use-case";
import { ListOwnersQuery } from "../../validators/owner/list-owners-query-schema";

export class ListOwnersController {
  async handle(req: Request, res: Response) {
    const { limit, offset, q } = req.query as unknown as ListOwnersQuery;

    const listOwnersUseCase = new ListOwnersUseCase();

    const result = await listOwnersUseCase.execute({ limit, offset, q });

    return res.status(200).json(result);
  }
}
