import { Request, Response } from "express";

import { UpdateUserUseCase } from "../../../application/usecases/admin/update-user-use-case";
import { UpdateUserBody } from "../../validators/admin/update-user-body-schema";

export class UpdateUserController {
  async handle(req: Request, res: Response) {
    const id = String(req.params.id);
    const { name, email, image, role } = req.body as UpdateUserBody;

    const updateUserUseCase = new UpdateUserUseCase();
    const user = await updateUserUseCase.execute({ id, name, email, image, role });

    return res.status(200).json(user);
  }
}
