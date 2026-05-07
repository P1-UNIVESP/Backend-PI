import { z } from "zod";

import { adminRoleSchema } from "./admin-role-schema";

export const updateUserBodySchema = z
  .object({
    name: z.string().trim().min(1).optional(),
    email: z.string().trim().email().optional(),
    image: z.string().url().nullable().optional(),
    role: adminRoleSchema.optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Informe ao menos um campo para atualizar",
  });

export type UpdateUserBody = z.infer<typeof updateUserBodySchema>;
