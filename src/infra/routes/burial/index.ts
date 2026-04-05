import { Router } from "express";

import { CreateBurialController } from "../../controllers/burial/create-burial-controller";
import { DeleteBurialController } from "../../controllers/burial/delete-burial-controller";
import { GetBurialController } from "../../controllers/burial/get-burial-controller";
import { ListBurialsController } from "../../controllers/burial/list-burials-controller";
import { UpdateBurialController } from "../../controllers/burial/update-burial-controller";
import { validateBody } from "../../middlewares/validate-body";
import { validateQuery } from "../../middlewares/validate-query";
import { createBurialBodySchema } from "../../validators/burial/create-burial-body-schema";
import { updateBurialBodySchema } from "../../validators/burial/update-burial-body-schema";
import { listBurialsQuerySchema } from "../../validators/burial/list-burials-query-schema";

const burialRoutes = Router();

const createBurialController = new CreateBurialController();
const getBurialController = new GetBurialController();
const listBurialsController = new ListBurialsController();
const updateBurialController = new UpdateBurialController();
const deleteBurialController = new DeleteBurialController();

burialRoutes.post("/burials", validateBody(createBurialBodySchema), async (req, res) => {
  return createBurialController.handle(req, res);
});

burialRoutes.get("/burials", validateQuery(listBurialsQuerySchema), async (req, res) => {
  return listBurialsController.handle(req, res);
});

burialRoutes.get("/burials/:id", async (req, res) => {
  return getBurialController.handle(req, res);
});

burialRoutes.put("/burials/:id", validateBody(updateBurialBodySchema), async (req, res) => {
  return updateBurialController.handle(req, res);
});

burialRoutes.delete("/burials/:id", async (req, res) => {
  return deleteBurialController.handle(req, res);
});

export { burialRoutes };
