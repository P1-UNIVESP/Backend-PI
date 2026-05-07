import { z } from "zod";

import { paginationQuerySchema } from "../pagination-query-schema";

export const listPlotOwnerHistoriesQuerySchema = paginationQuerySchema.extend({
  q: z.string().trim().min(1).optional(),
  plotId: z.string().uuid().optional(),
  ownerId: z.string().uuid().optional(),
  active: z
    .enum(["true", "false"])
    .transform((value) => value === "true")
    .optional(),
});

export type ListPlotOwnerHistoriesQuery = z.infer<typeof listPlotOwnerHistoriesQuerySchema>;
