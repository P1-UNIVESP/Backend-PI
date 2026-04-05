import { z } from "zod";

import { paginationQuerySchema } from "../pagination-query-schema";

export const listBurialsQuerySchema = paginationQuerySchema.extend({
  q: z.string().min(1).optional(),
});

export type ListBurialsQuery = z.infer<typeof listBurialsQuerySchema>;
