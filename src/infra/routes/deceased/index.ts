import { Router } from "express";

import { CreateDeceasedController } from "../../controllers/deceased/create-deceased-controller";
import { DeleteDeceasedController } from "../../controllers/deceased/delete-deceased-controller";
import { GetDeceasedController } from "../../controllers/deceased/get-deceased-controller";
import { ListDeceasedController } from "../../controllers/deceased/list-deceased-controller";
import { UpdateDeceasedController } from "../../controllers/deceased/update-deceased-controller";
import { validateBody } from "../../middlewares/validate-body";
import { validateQuery } from "../../middlewares/validate-query";
import { createDeceasedBodySchema } from "../../validators/deceased/create-deceased-body-schema";
import { updateDeceasedBodySchema } from "../../validators/deceased/update-deceased-body-schema";
import { listDeceasedQuerySchema } from "../../validators/deceased/list-deceased-query-schema";

const deceasedRoutes = Router();

const createDeceasedController = new CreateDeceasedController();
const getDeceasedController = new GetDeceasedController();
const listDeceasedController = new ListDeceasedController();
const updateDeceasedController = new UpdateDeceasedController();
const deleteDeceasedController = new DeleteDeceasedController();

deceasedRoutes.post("/deceased", validateBody(createDeceasedBodySchema), async (req, res) => {
  return createDeceasedController.handle(req, res);
});

deceasedRoutes.get("/deceased", validateQuery(listDeceasedQuerySchema), async (req, res) => {
  return listDeceasedController.handle(req, res);
});

deceasedRoutes.get("/deceased/:id", async (req, res) => {
  return getDeceasedController.handle(req, res);
});

deceasedRoutes.put("/deceased/:id", validateBody(updateDeceasedBodySchema), async (req, res) => {
  return updateDeceasedController.handle(req, res);
});

deceasedRoutes.delete("/deceased/:id", async (req, res) => {
  return deleteDeceasedController.handle(req, res);
});

export { deceasedRoutes };
