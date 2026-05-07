import { Request, Response } from "express";

import { BanUserUseCase } from "../../../application/usecases/admin/ban-user-use-case";
import { BanUserBody } from "../../validators/admin/ban-user-body-schema";

export class BanUserController {
  async handle(req: Request, res: Response) {
    const id = String(req.params.id);
    const { banReason, banExpiresIn } = req.body as BanUserBody;

    const banUserUseCase = new BanUserUseCase();
    const user = await banUserUseCase.execute({ id, banReason, banExpiresIn });

    return res.status(200).json(user);
  }
}
