import { z } from "zod";

import { paginationQuerySchema } from "../pagination-query-schema";

export const listOwnersQuerySchema = paginationQuerySchema.extend({
  q: z.string().min(1).optional(),
});

export type ListOwnersQuery = z.infer<typeof listOwnersQuerySchema>;
