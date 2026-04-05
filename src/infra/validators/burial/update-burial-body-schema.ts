import { z } from "zod";

export const updateBurialBodySchema = z
  .object({
    burialDate: z.iso.datetime().optional(),
    plotId: z.string().uuid().optional(),
    deceasedId: z.string().uuid().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Informe ao menos um campo para atualizacao",
  });

export type UpdateBurialBody = z.infer<typeof updateBurialBodySchema>;
