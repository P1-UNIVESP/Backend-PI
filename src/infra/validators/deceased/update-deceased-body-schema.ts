import { z } from "zod";

export const updateDeceasedBodySchema = z
  .object({
    name: z.string().min(3).optional(),
    birthDate: z.iso.datetime().optional(),
    deathDate: z.iso.datetime().optional(),
    deathCertificate: z.string().min(3).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Informe ao menos um campo para atualizacao",
  });

export type UpdateDeceasedBody = z.infer<typeof updateDeceasedBodySchema>;
