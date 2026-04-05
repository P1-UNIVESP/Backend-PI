import { Router } from "express";

import { RegisterDeathController } from "../../controllers/register-death-controller";
import { validateBody } from "../../middlewares/validate-body";
import { registerDeathBodySchema } from "../../validators/register-death-body-schema";

const deathRoutes = Router();
const registerDeathController = new RegisterDeathController();

deathRoutes.post("/deaths", validateBody(registerDeathBodySchema), async (req, res) => {
  return registerDeathController.handle(req, res);
});

export { deathRoutes };
