import { z } from "zod";

import { paginationQuerySchema } from "../pagination-query-schema";

export const listDeceasedQuerySchema = paginationQuerySchema.extend({
  q: z.string().min(1).optional(),
});

export type ListDeceasedQuery = z.infer<typeof listDeceasedQuerySchema>;
