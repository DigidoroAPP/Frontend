import { z } from "zod";

export const sessionSchema = z.object({
  title: z
    .string()
    .min(1, { message: "El título no puede estar vacío" })
    .max(50, { message: "El título no puede exceder los 50 caracteres" }),
  session: z
    .number()
    .min(1, { message: "El número de sesiones debe ser al menos 1" }),
  color: z.string(),
});