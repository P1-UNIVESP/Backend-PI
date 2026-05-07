import { Request, Response } from "express";

import { SetUserPasswordUseCase } from "../../../application/usecases/admin/set-user-password-use-case";
import { SetUserPasswordBody } from "../../validators/admin/set-user-password-body-schema";

export class SetUserPasswordController {
  async handle(req: Request, res: Response) {
    const id = String(req.params.id);
    const { password } = req.body as SetUserPasswordBody;

    const setUserPasswordUseCase = new SetUserPasswordUseCase();
    const result = await setUserPasswordUseCase.execute({ id, password, headers: req.headers });

    return res.status(200).json(result);
  }
}
