import { Request, Response } from "express";

import { ListBurialsUseCase } from "../../../application/usecases/burial/list-burials-use-case";
import { ListBurialsQuery } from "../../validators/burial/list-burials-query-schema";

export class ListBurialsController {
  async handle(req: Request, res: Response) {
    const { limit, offset, q } = req.query as unknown as ListBurialsQuery;

    const listBurialsUseCase = new ListBurialsUseCase();

    const result = await listBurialsUseCase.execute({ limit, offset, q });

    return res.status(200).json(result);
  }
}
