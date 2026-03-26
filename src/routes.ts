import { Router } from "express";
import { RegisterDeathController } from "./infra/controllers/register-death-controller";
import { validateBody } from "./infra/middlewares/validate-body";
import { registerDeathBodySchema } from "./infra/validators/register-death-body-schema";

const routes = Router();
const registerDeathController = new RegisterDeathController();

routes.post("/deaths", validateBody(registerDeathBodySchema), async (req, res) => {
	return registerDeathController.handle(req, res);
});

export { routes };
