import { Request, Response } from "express";

import { ListUsersUseCase } from "../../../application/usecases/admin/list-users-use-case";
import { ListUsersQuery } from "../../validators/admin/list-users-query-schema";

export class ListUsersController {
  async handle(req: Request, res: Response) {
    const { limit, offset, q, role } = req.query as unknown as ListUsersQuery;

    const listUsersUseCase = new ListUsersUseCase();
    const result = await listUsersUseCase.execute({ limit, offset, q, role });

    return res.status(200).json(result);
  }
}
