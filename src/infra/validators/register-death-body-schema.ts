import { z } from "zod";

export const registerDeathBodySchema = z.object({
  name: z.string().min(3),
  cause: z.string().min(3),
  occurredAt: z.iso.datetime(),
  location: z.string().min(2).optional(),
});

export type RegisterDeathBody = z.infer<typeof registerDeathBodySchema>;
