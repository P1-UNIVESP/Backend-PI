import { Request, Response } from "express";

import { CreateUserUseCase } from "../../../application/usecases/admin/create-user-use-case";
import { CreateUserBody } from "../../validators/admin/create-user-body-schema";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password, role } = req.body as CreateUserBody;

    const createUserUseCase = new CreateUserUseCase();
    const user = await createUserUseCase.execute({ name, email, password, role });

    return res.status(201).json(user);
  }
}
