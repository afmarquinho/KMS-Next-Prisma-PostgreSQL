import { Decimal } from "@prisma/client/runtime/client";

//* CONVIERTE EL FORMATO FECHA EN FORMATO LEGIBLE PATA LOS FORMULARIOS DEVUELVE STRING EN "YYYY-MM-DD"
export const formatDateForInput = (isoDate: Date | string): string => {
  const date = new Date(isoDate);
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${year}-${month}-${day}`;
};

//* FORMATEAR LAS FECHAS EN FORMATO LEGIBLE PARA EL USUARIO, DEVUELVE STRING EN "DD-MM-YYYY"
export const formatISOToDate = (dateInput: string | Date): string => {
  if (!dateInput) return ""; // Manejo de valores vacíos

  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return ""; // Manejo de fechas inválidas

  const isoToString = date.toISOString().split("T")[0]; // convierte en formato YYYY-MM-DD
  const [year, month, day] = isoToString.split("-");

  return `${day}-${month}-${year}`; // Retorna en formato DD-MM-YYYY
};

//* FORMATEAR UN VALOR DE TIPO DECIMAL A MONEDA
export const formatToCurrency = (value: Decimal) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(value));
};

//* CONVIERTE MONEDAS EN NÚMERO
export const parseCurrencyToNumber = (value: string): number => {
  return parseFloat(value.replace(/[^0-9.]/g, "")) || 0;
};
