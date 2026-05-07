import { z } from "zod";

export const setUserPasswordBodySchema = z.object({
  password: z.string().min(8),
});

export type SetUserPasswordBody = z.infer<typeof setUserPasswordBodySchema>;
