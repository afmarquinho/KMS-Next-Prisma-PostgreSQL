import { z } from "zod";

export const inventorySchema = z.object({
  Inv_qty: z.number().min(1, "La cantidad es requerida"),
  Inv_batch: z.string().min(1, "El lote es requerido"),
  Inv_batchDueDate: z
    .date()
    .min(
      new Date(),
      "La fecha de vencimiento es requerida y debe ser mayor a la fecha actual"
    ),

  Mov_reason: z.string().min(1, "El motivo es requerido"),
});
