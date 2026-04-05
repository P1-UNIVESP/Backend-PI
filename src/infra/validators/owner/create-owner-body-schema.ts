import { z } from "zod";

export const createOwnerBodySchema = z.object({
  name: z.string().min(3),
  cpf: z.string().min(11),
  phone: z.string().min(8).optional(),
});

export type CreateOwnerBody = z.infer<typeof createOwnerBodySchema>;
