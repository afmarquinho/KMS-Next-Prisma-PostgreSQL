import { Prisma } from "@prisma/client";

export type InventoryTable = Prisma.ProductGetPayload<{
    select: {
      Product_id: true;
      Product_name: true;
      Product_ref: true;
      Product_stockQty: true;
      Product_reorderPoint: true;
      Product_location: true;
      Product_active: true;
      Product_createdAt: true;
      Category: {
        select: {
          Category_name: true;
        };
      };
    };
  }>;