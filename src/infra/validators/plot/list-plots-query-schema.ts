import { z } from "zod";

import { paginationQuerySchema } from "../pagination-query-schema";

export const listPlotsQuerySchema = paginationQuerySchema.extend({
  q: z.string().min(1).optional(),
  status: z.enum(["DISPONIVEL", "OCUPADO", "MANUTENCAO"]).optional(),
  type: z.enum(["TERRA", "GAVETA", "MAUSOLEU"]).optional(),
});

export type ListPlotsQuery = z.infer<typeof listPlotsQuerySchema>;
