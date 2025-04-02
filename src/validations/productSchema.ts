import { z } from "zod";

export const productSchema = z.object({
  Prod_ref: z.string().min(3, "La referencia debe tener al menos 3 caracteres"),
  Prod_name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  Prod_desc: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  Prod_catId: z.number({ invalid_type_error: "Debe seleccionar una categoría" }),
  Prod_brand: z.string().optional(),
  Prod_unitMeasure: z.string().nonempty("Debe seleccionar una unidad de medida"),
});