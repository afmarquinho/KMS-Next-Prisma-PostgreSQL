import supplierSchema from "@/validations/supplierSchema";
import { z } from "zod";


export type CurrentViewSupplierPage = "list" | "form";

export type FormValuesSupplierType = z.infer<typeof supplierSchema>;

