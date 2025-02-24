import { z } from "zod";

const itemSchema = z.object({
  Item_ref: z.string().optional(), // 🔹 Ahora es opcional
  Item_name: z.string().min(1, "El nombre del ítem es obligatorio"),
  Item_desc: z.string().min(1, "La descripción del ítem es obligatoria"),
  Item_unitCost: z
    .number()
    .positive("El costo unitario debe ser un número positivo"),
  Item_qtyOrdered: z
    .number()
    .int()
    .positive("La cantidad ordenada debe ser un número entero positivo"),
  Item_catId: z
    .number()
    .int()
    .positive("El ID de la categoría debe ser un número entero positivo"),
  Item_unitMeasure: z.string().min(1, "La unidad de medida es obligatoria"),
});

export default itemSchema;
