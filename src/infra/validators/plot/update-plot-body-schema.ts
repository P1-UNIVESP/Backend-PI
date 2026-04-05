import { z } from "zod";

export const updatePlotBodySchema = z
  .object({
    code: z.string().min(1).optional(),
    type: z.enum(["TERRA", "GAVETA", "MAUSOLEU"]).optional(),
    status: z.enum(["DISPONIVEL", "OCUPADO", "MANUTENCAO"]).optional(),
    capacity: z.number().int().positive().optional(),
    ownerId: z.string().uuid().nullable().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Informe ao menos um campo para atualizacao",
  });

export type UpdatePlotBody = z.infer<typeof updatePlotBodySchema>;
