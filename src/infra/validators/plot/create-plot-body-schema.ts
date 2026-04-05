import { z } from "zod";

export const createPlotBodySchema = z.object({
  code: z.string().min(1),
  type: z.enum(["TERRA", "GAVETA", "MAUSOLEU"]),
  status: z.enum(["DISPONIVEL", "OCUPADO", "MANUTENCAO"]).optional(),
  capacity: z.number().int().positive(),
  ownerId: z.string().uuid().optional(),
});

export type CreatePlotBody = z.infer<typeof createPlotBodySchema>;
