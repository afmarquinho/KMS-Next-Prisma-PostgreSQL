import { z } from "zod";

export const productSchema = z.object({
 
  Prod_ref: z.string().min(1, "La referencia del producto es requerida"),
  Prod_qtyReceive: z
    .number()
    .int()
    .positive("La cantidad recibida debe ser un número entero positivo"),
  Prod_batchCode: z.string().min(1, "El código de lote es requerido"),
  Prod_batchDate: z.date(),

  
  reason: z.string().min(1, "La razón de ingreso es requerida"),
});

// Para validar datos de entrada:
// const result = InvrProductSchema.safeParse(data);
// if (!result.success) console.log(result.error.format());
