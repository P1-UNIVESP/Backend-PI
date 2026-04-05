import { z } from "zod";

export const createBurialBodySchema = z.object({
  burialDate: z.iso.datetime(),
  plotId: z.string().uuid(),
  deceasedId: z.string().uuid(),
});

export type CreateBurialBody = z.infer<typeof createBurialBodySchema>;
