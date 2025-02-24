import { z } from "zod";

const customerSchema = z.object({
  Cust_dni: z
    .number({
      required_error: "La cédula del cliente es obligatoria",
      invalid_type_error: "Digite un cédula válida",
    })
    .positive({ message: "Digite un cédula válida" }),
  Cust_name: z
    .string({
      required_error: "El nombre es obligatorio",
      invalid_type_error: "El nombre debe ser un texto",
    })
    .min(2, "El nombre debe tener al menos 2 caracteres"),
  Cust_surname: z
    .string({
      required_error: "El apellido es obligatorio",
      invalid_type_error: "El apellido debe ser un texto",
    })
    .min(2, "El apellido debe tener al menos 2 caracteres"),
  Cust_email: z
    .string({
      required_error: "El correo es obligatorio",
      invalid_type_error: "El correo debe ser un texto",
    })
    .email("Ingrese un correo válido"),
  Cust_phoneNumber: z
    .string({
      required_error: "El número de teléfono es obligatorio",
      invalid_type_error: "El número de teléfono debe ser un texto",
    })
    .regex(/^\+?[0-9]{7,15}$/, "Ingrese un número de teléfono válido"),
  Cust_address: z
    .string({
      required_error: "La dirección es obligatoria",
      invalid_type_error: "La dirección debe ser un texto",
    })
    .min(5, "La dirección debe tener al menos 5 caracteres"),
  Cust_habeasData: z.literal(true, {
    errorMap: () => ({
      message:
        "Debe aceptar los términos de la política de tratamiento de datos personales.",
    }),
  }),
});

export default customerSchema;