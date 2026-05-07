import { z } from "zod";

import { adminRoleSchema } from "./admin-role-schema";

export const createUserBodySchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  password: z.string().min(8),
  role: adminRoleSchema.optional(),
});

export type CreateUserBody = z.infer<typeof createUserBodySchema>;
