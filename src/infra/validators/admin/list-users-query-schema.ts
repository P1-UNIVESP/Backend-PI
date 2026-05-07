import { z } from "zod";

import { paginationQuerySchema } from "../pagination-query-schema";
import { adminRoleSchema } from "./admin-role-schema";

export const listUsersQuerySchema = paginationQuerySchema.extend({
  q: z.string().trim().optional(),
  role: adminRoleSchema.optional(),
});

export type ListUsersQuery = z.infer<typeof listUsersQuerySchema>;
