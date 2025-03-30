import { z } from "zod";

export const productSchema = z.object({
  Prod_qtyReceive: z
    .number()
    .int()
    .positive("La cantidad recibida debe ser un número entero positivo"),
  Prod_batchCode: z.string().min(1, "El código de lote es requerido"),
  Prod_batchDate: z
    .date()
    .refine((date) => date > new Date(), {
      message: "La fecha de vencimiento debe ser una fecha futura",
    }),
  reason: z.string().min(1, "La razón de ingreso es requerida"),
});


