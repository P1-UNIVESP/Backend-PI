import { Request, Response } from "express";

import { GetUserUseCase } from "../../../application/usecases/admin/get-user-use-case";

export class GetUserController {
  async handle(req: Request, res: Response) {
    const id = String(req.params.id);

    const getUserUseCase = new GetUserUseCase();
    const user = await getUserUseCase.execute({ id });

    return res.status(200).json(user);
  }
}
