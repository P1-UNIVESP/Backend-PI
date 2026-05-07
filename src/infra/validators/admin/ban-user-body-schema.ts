import { z } from "zod";

export const banUserBodySchema = z.object({
  banReason: z.string().trim().min(1).optional(),
  banExpiresIn: z.coerce.number().int().positive().optional(),
});

export type BanUserBody = z.infer<typeof banUserBodySchema>;
