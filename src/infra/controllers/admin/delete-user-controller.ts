import { Request, Response } from "express";

import { DeleteUserUseCase } from "../../../application/usecases/admin/delete-user-use-case";

export class DeleteUserController {
  async handle(req: Request, res: Response) {
    const id = String(req.params.id);
    const currentUserId = res.locals.auth.user.id;

    const deleteUserUseCase = new DeleteUserUseCase();
    const result = await deleteUserUseCase.execute({ id, currentUserId });

    return res.status(200).json(result);
  }
}
