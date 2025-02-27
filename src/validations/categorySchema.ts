import { z } from "zod";


const categorySchema = z.object({
  Cat_name: z
    .string({
      required_error: "El nombre es obligatorio",
      invalid_type_error: "El nombre debe ser un texto",
    })
    .min(2, "El nombre debe tener al menos 2 caracteres"),
});

export default categorySchema;
