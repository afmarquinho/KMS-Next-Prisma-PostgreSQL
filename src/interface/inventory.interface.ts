import { Item, Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/client";

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

export type InvItemType = Omit<Item, "Item_totalAmount" | "Item_unitCost"> & {
  Item_unitCost: string; // Formateado con `formatToCurrency`
  Item_totalAmount: string; // Formateado con `formatToCurrency`
  Product: {
    Prod_id: number;
    Prod_name: string;
    Prod_ref: string;
    Prod_desc: string;
    Category: {
      Cat_name: string;
    };
  };
};

type InvProcurementNoteBaseType = Prisma.ProcurementNoteGetPayload<{
  select: {
    Note_id: true;
    Note_content: true;
    createdAt: true;
    createdBy: true;
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
  "createdAt"
> & {
  createdAt: string;
};

// Definir el tipo para Procurement con relaciones
// export type InvProcurementType = Omit<
//   Prisma.ProcurementGetPayload<{
//     include: {
//       Supplier: {
  //       select: {
  //         Supp_nit: true;
  //         Supp_name: true;
  //         Supp_contactInfo: true;
  //         Supp_email: true;
  //         Supp_phoneNumber: true;
  //         Supp_city: true;
  //         Supp_address: true;
  //         Supp_active: true;
  //       };
  //     };
  //     Item: true;
  //     ProcurementNote: {
  //       orderBy: { Note_createdAt: "desc" };
  //       select: {
  //         Note_id: true;
  //         Note_content: true;
  //         Note_createdAt: true;
  //         User: {
  //           select: {
  //             User_name: true;
  //             User_surname: true;
  //           };
  //         };
  //       };
  //     };
  //     User: {
  //       select: {
  //         User_name: true;
  //         User_surname: true;
  //       };
  //     };
  //   };
  // }>,
  // "Item" | "ProcurementNote" | "Pro_totalAmount" | "Pro_date" | "Pro_dueDate"
// > & {
//   Pro_totalAmount: string;
//   Pro_date: string;
//   Pro_dueDate: string;
//   Item: InvItemType[];
//   ProcurementNote: InvProcurementNoteType[];
// };

export type InvDataType = {
  //? --> Type para adicionar un producto al inventario
  Inv_stock:number;
  Inv_itemId:number;
  Inv_batch: string;
  Inv_batchDueDate: Date;
  Mov_reason: string;
};

//? Respuesta de la consulta a la api para visualizar el inventario
export type InvProductType = {
  Prod_id: number;
  Prod_name: string;
  Prod_ref: string;
  Prod_stock: number;
  Prod_batch: string;
  Prod_procurementEnabled: boolean;
  Prod_saleEnabled: boolean;
  Prod_margin: Decimal;
  Item: {
    Item_unitCost: Decimal;
    Category: {
      Cat_name: string;
    };
    Procurement: {
      Supplier: {
        Supp_name: true;
      };
    };
  };
};
