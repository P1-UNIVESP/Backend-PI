import { Router } from "express";
import { adminRoutes } from "./infra/routes/admin";
import { burialRoutes } from "./infra/routes/burial";
import { deathRoutes } from "./infra/routes/death";
import { deceasedRoutes } from "./infra/routes/deceased";
import { requireAuth } from "./infra/middlewares/require-auth";
import { ownerRoutes } from "./infra/routes/owner";
import { plotOwnerHistoryRoutes } from "./infra/routes/plot-owner-history";
import { plotRoutes } from "./infra/routes/plot";

const routes = Router();

routes.use(adminRoutes);
routes.use(requireAuth);
routes.use(ownerRoutes);
routes.use(plotRoutes);
routes.use(plotOwnerHistoryRoutes);
routes.use(deceasedRoutes);
routes.use(burialRoutes);
routes.use(deathRoutes);

export { routes };
