import { Item } from "@prisma/client";


// Type para cada item a mostrar en cada card en procurementDetails
export type ItemDetailsType = Item & {
   Product: {
     Prod_name: string;
     Prod_ref: string;
     Prod_desc: string;
     Prod_unitMeasure: string;
    Category: {
       Cat_name: string;
     };
   };
 };

// Type para crear un nuevo item
export type ItemCreateType = {
  Item_procId: number;
  Item_prodId: number;
  Item_unitCost: number;
  Item_qtyOrdered: number;
  Item_totalAmount: number;
};
