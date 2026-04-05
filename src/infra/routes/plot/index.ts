import { Router } from "express";

import { CreatePlotController } from "../../controllers/plot/create-plot-controller";
import { DeletePlotController } from "../../controllers/plot/delete-plot-controller";
import { GetPlotController } from "../../controllers/plot/get-plot-controller";
import { ListPlotsController } from "../../controllers/plot/list-plots-controller";
import { UpdatePlotController } from "../../controllers/plot/update-plot-controller";
import { validateBody } from "../../middlewares/validate-body";
import { validateQuery } from "../../middlewares/validate-query";
import { createPlotBodySchema } from "../../validators/plot/create-plot-body-schema";
import { updatePlotBodySchema } from "../../validators/plot/update-plot-body-schema";
import { listPlotsQuerySchema } from "../../validators/plot/list-plots-query-schema";

const plotRoutes = Router();

const createPlotController = new CreatePlotController();
const getPlotController = new GetPlotController();
const listPlotsController = new ListPlotsController();
const updatePlotController = new UpdatePlotController();
const deletePlotController = new DeletePlotController();

plotRoutes.post("/plots", validateBody(createPlotBodySchema), async (req, res) => {
  return createPlotController.handle(req, res);
});

plotRoutes.get("/plots", validateQuery(listPlotsQuerySchema), async (req, res) => {
  return listPlotsController.handle(req, res);
});

plotRoutes.get("/plots/:id", async (req, res) => {
  return getPlotController.handle(req, res);
});

plotRoutes.put("/plots/:id", validateBody(updatePlotBodySchema), async (req, res) => {
  return updatePlotController.handle(req, res);
});

plotRoutes.delete("/plots/:id", async (req, res) => {
  return deletePlotController.handle(req, res);
});

export { plotRoutes };
