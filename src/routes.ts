import { Router } from "express";
import { burialRoutes } from "./infra/routes/burial";
import { deathRoutes } from "./infra/routes/death";
import { deceasedRoutes } from "./infra/routes/deceased";
import { ownerRoutes } from "./infra/routes/owner";
import { plotRoutes } from "./infra/routes/plot";

const routes = Router();

routes.use(ownerRoutes);
routes.use(plotRoutes);
routes.use(deceasedRoutes);
routes.use(burialRoutes);
routes.use(deathRoutes);

export { routes };
