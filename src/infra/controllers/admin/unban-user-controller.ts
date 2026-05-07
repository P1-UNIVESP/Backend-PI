import { Request, Response } from "express";

import { UnbanUserUseCase } from "../../../application/usecases/admin/unban-user-use-case";

export class UnbanUserController {
  async handle(req: Request, res: Response) {
    const id = String(req.params.id);

    const unbanUserUseCase = new UnbanUserUseCase();
    const user = await unbanUserUseCase.execute({ id });

    return res.status(200).json(user);
  }
}
