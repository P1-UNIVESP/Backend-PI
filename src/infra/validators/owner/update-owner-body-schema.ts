import { z } from "zod";

export const updateOwnerBodySchema = z
  .object({
    name: z.string().min(3).optional(),
    cpf: z.string().min(11).optional(),
    phone: z.string().min(8).nullable().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Informe ao menos um campo para atualizacao",
  });

export type UpdateOwnerBody = z.infer<typeof updateOwnerBodySchema>;
