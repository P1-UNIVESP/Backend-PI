import { Router } from "express";

import { ListPlotOwnerHistoriesController } from "../../controllers/plot-owner-history/list-plot-owner-histories-controller";
import { validateQuery } from "../../middlewares/validate-query";
import { listPlotOwnerHistoriesQuerySchema } from "../../validators/plot-owner-history/list-plot-owner-histories-query-schema";

const plotOwnerHistoryRoutes = Router();

const listPlotOwnerHistoriesController = new ListPlotOwnerHistoriesController();

plotOwnerHistoryRoutes.get(
  "/plot-owner-histories",
  validateQuery(listPlotOwnerHistoriesQuerySchema),
  async (req, res) => {
    return listPlotOwnerHistoriesController.handle(req, res);
  },
);

export { plotOwnerHistoryRoutes };
