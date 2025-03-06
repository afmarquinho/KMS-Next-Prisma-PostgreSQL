import { Prisma } from "@prisma/client";

export type InvTableType = Prisma.ProductGetPayload<{
  select: {
    Pro_id: true;
    Pro_name: true;
    Pro_ref: true;
    Pro_stockQty: true;
    Pro_reorderPoint: true;
    Pro_location: true;
    Pro_active: true;
    Pro_createdAt: true;
    Category: {
      select: {
        Cat_name: true;
      };
    };
  };
}>;

export type InvItemType = Omit<
  Prisma.ItemGetPayload<{
    include: {
      Category: {
        select: {
          Cat_id: true;
          Cat_name: true;
        };
      };
    };
  }>,
  "Item_unitCost" | "Item_totalAmount"
> & {
  Item_unitCost: string; // Formateado con `formatToCurrency`
  Item_totalAmount: string; // Formateado con `formatToCurrency`
};

type InvProcurementNoteBaseType = Prisma.ProcurementNoteGetPayload<{
  select: {
    Note_id: true;
    Note_content: true;
    Note_createdAt: true;
    User: {
      select: {
        User_name: true;
        User_surname: true;
      };
    };
  };
}>;
export type InvProcurementNoteType = Omit<
  InvProcurementNoteBaseType,
  "Note_createdAt"
> & {
  Note_createdAt: string;
};

// Definir el tipo para Procurement con relaciones
export type InvProcurementType = Omit<
  Prisma.ProcurementGetPayload<{
    include: {
      Supplier: {
        select: {
          Supp_nit: true;
          Supp_name: true;
          Supp_contactInfo: true;
          Supp_email: true;
          Supp_phoneNumber: true;
          Supp_city: true;
          Supp_address: true;
          Supp_active: true;
        };
      };
      Item: true;
      ProcurementNote: {
        orderBy: { Note_createdAt: "desc" };
        select: {
          Note_id: true;
          Note_content: true;
          Note_createdAt: true;
          User: {
            select: {
              User_name: true;
              User_surname: true;
            };
          };
        };
      };
      User: {
        select: {
          User_name: true;
          User_surname: true;
        };
      };
    };
  }>,
  "Item" | "ProcurementNote" | "Pro_totalAmount" | "Pro_date" | "Pro_dueDate"
> & {
  Pro_totalAmount: string;
  Pro_date: string;
  Pro_dueDate: string;
  Item: InvItemType[];
  ProcurementNote: InvProcurementNoteType[];
};

export type InvrProductDataType = {
  //? --> Type para adicionar un producto al inventario
  Prod_name: string;
  Prod_ref: string;
  Prod_qtyReceive: number;
  Prod_location?: string;
  Prod_batchCode: string;
  Prod_batchDate: Date;
  Prod_catId: number;
  Item_id: number;
  reason: string;
};
