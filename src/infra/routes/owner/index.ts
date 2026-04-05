import { Router } from "express";

import { CreateOwnerController } from "../../controllers/owner/create-owner-controller";
import { DeleteOwnerController } from "../../controllers/owner/delete-owner-controller";
import { GetOwnerController } from "../../controllers/owner/get-owner-controller";
import { ListOwnersController } from "../../controllers/owner/list-owners-controller";
import { UpdateOwnerController } from "../../controllers/owner/update-owner-controller";
import { validateBody } from "../../middlewares/validate-body";
import { validateQuery } from "../../middlewares/validate-query";
import { createOwnerBodySchema } from "../../validators/owner/create-owner-body-schema";
import { updateOwnerBodySchema } from "../../validators/owner/update-owner-body-schema";
import { listOwnersQuerySchema } from "../../validators/owner/list-owners-query-schema";

const ownerRoutes = Router();

const createOwnerController = new CreateOwnerController();
const getOwnerController = new GetOwnerController();
const listOwnersController = new ListOwnersController();
const updateOwnerController = new UpdateOwnerController();
const deleteOwnerController = new DeleteOwnerController();

ownerRoutes.post("/owners", validateBody(createOwnerBodySchema), async (req, res) => {
  return createOwnerController.handle(req, res);
});

ownerRoutes.get("/owners", validateQuery(listOwnersQuerySchema), async (req, res) => {
  return listOwnersController.handle(req, res);
});

ownerRoutes.get("/owners/:id", async (req, res) => {
  return getOwnerController.handle(req, res);
});

ownerRoutes.put("/owners/:id", validateBody(updateOwnerBodySchema), async (req, res) => {
  return updateOwnerController.handle(req, res);
});

ownerRoutes.delete("/owners/:id", async (req, res) => {
  return deleteOwnerController.handle(req, res);
});

export { ownerRoutes };
