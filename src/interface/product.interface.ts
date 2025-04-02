import { Product } from "@prisma/client";

export type ProductListType = Omit<
  Product,
  | "Prod_ref"
  | "Prod_desc"
  | "Prod_catId"
  | "Prod_brand"
  | "createdBy"
  | "createdAt"
>;


