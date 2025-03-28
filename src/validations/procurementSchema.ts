import { z } from "zod";

const procurementSchema = z.object({
  Proc_desc: z
    .string({
      required_error: "La descripción es obligatoria",
      invalid_type_error: "Digite un texto válido",
    })
    .min(1, "Digite un téxto válido")
    .max(250, "Descripción demasiado larga"),
  Proc_paymentMethod: z.string().min(1, "Digite el medio de pago"),

  Proc_dueDate: z
    // .string()
    // .refine((date) => new Date(date).toString() !== "Invalid Date", {
    //   message: "La fecha es requerida",
    // })
    // .transform((date) => new Date(date))
    // .refine((date) => date > new Date(), {
    //   message: "La fecha debe ser futura",
    // }),
    .date(),

  Proc_suppId: z.preprocess(
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
