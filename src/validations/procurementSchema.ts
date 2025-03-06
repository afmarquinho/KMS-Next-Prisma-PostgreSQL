import { z } from "zod";

const procurementSchema = z.object({
  Pro_desc: z
    .string({
      required_error: "La descripción es obligatoria",
      invalid_type_error: "Digite un texto válido",
    })
    .min(1, "Digite un téxto válido")
    .max(250, "Descripción demasiado larga"),
  Pro_paymentMethod: z.string().min(1, "Digite el medio de pago"),

  Pro_dueDate: z
    // .string()
    // .refine((date) => new Date(date).toString() !== "Invalid Date", {
    //   message: "La fecha es requerida",
    // })
    // .transform((date) => new Date(date))
    // .refine((date) => date > new Date(), {
    //   message: "La fecha debe ser futura",
    // }),
    .date(),

  Pro_suppId: z.preprocess(
    (value) => {
      if (typeof value === "string" && value.trim() === "") {
        return NaN;
      }
      return Number(value);
    },
    z
      .number()
      .int()
      .positive("Debe escoger un proveedor de la lista")
      .or(
        z.nan().refine(() => false, {
          message: "Se requiere un proveedor de lista",
        })
      )
  ),
});

export default procurementSchema;
