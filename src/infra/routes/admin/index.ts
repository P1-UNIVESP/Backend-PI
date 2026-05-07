import { Router } from "express";

import { CreateUserController } from "../../controllers/admin/create-user-controller";
import { DeleteUserController } from "../../controllers/admin/delete-user-controller";
import { GetUserController } from "../../controllers/admin/get-user-controller";
import { ListUsersController } from "../../controllers/admin/list-users-controller";
import { UpdateUserController } from "../../controllers/admin/update-user-controller";
import { SetUserPasswordController } from "../../controllers/admin/set-user-password-controller";
import { BanUserController } from "../../controllers/admin/ban-user-controller";
import { UnbanUserController } from "../../controllers/admin/unban-user-controller";
import { requireAdmin } from "../../middlewares/require-auth";
import { validateBody } from "../../middlewares/validate-body";
import { validateQuery } from "../../middlewares/validate-query";
import { createUserBodySchema } from "../../validators/admin/create-user-body-schema";
import { updateUserBodySchema } from "../../validators/admin/update-user-body-schema";
import { listUsersQuerySchema } from "../../validators/admin/list-users-query-schema";
import { setUserPasswordBodySchema } from "../../validators/admin/set-user-password-body-schema";
import { banUserBodySchema } from "../../validators/admin/ban-user-body-schema";

const adminRoutes = Router();

const createUserController = new CreateUserController();
const getUserController = new GetUserController();
const listUsersController = new ListUsersController();
const updateUserController = new UpdateUserController();
const setUserPasswordController = new SetUserPasswordController();
const banUserController = new BanUserController();
const unbanUserController = new UnbanUserController();
const deleteUserController = new DeleteUserController();

adminRoutes.use("/admin/users", requireAdmin);

adminRoutes.post("/admin/users", validateBody(createUserBodySchema), async (req, res) => {
  return createUserController.handle(req, res);
});

adminRoutes.get("/admin/users", validateQuery(listUsersQuerySchema), async (req, res) => {
  return listUsersController.handle(req, res);
});

adminRoutes.get("/admin/users/:id", async (req, res) => {
  return getUserController.handle(req, res);
});

adminRoutes.put("/admin/users/:id", validateBody(updateUserBodySchema), async (req, res) => {
  return updateUserController.handle(req, res);
});

adminRoutes.patch(
  "/admin/users/:id/password",
  validateBody(setUserPasswordBodySchema),
  async (req, res) => {
    return setUserPasswordController.handle(req, res);
  },
);

adminRoutes.patch("/admin/users/:id/ban", validateBody(banUserBodySchema), async (req, res) => {
  return banUserController.handle(req, res);
});

adminRoutes.patch("/admin/users/:id/unban", async (req, res) => {
  return unbanUserController.handle(req, res);
});

adminRoutes.delete("/admin/users/:id", async (req, res) => {
  return deleteUserController.handle(req, res);
});

export { adminRoutes };
