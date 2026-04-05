import { z } from "zod";

export const createDeceasedBodySchema = z.object({
  name: z.string().min(3),
  birthDate: z.iso.datetime(),
  deathDate: z.iso.datetime(),
  deathCertificate: z.string().min(3),
});

export type CreateDeceasedBody = z.infer<typeof createDeceasedBodySchema>;
