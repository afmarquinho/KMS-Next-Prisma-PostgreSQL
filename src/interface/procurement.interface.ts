import { Procurement } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/client";

export type ProcurementType = Omit<
  Procurement,
  "Proc_totalAmount" | "Proc_date" | "Proc_dueDate"
> & {
  Proc_totalAmount: string;
  Proc_date: string;
  Proc_dueDate: string;
  Supplier: {
    Supp_name: string;
  };
};

export type ProcurementDetailsType = Procurement & {
  Supplier: {
    Supp_nit: number;
    Supp_name: string;
    Supp_contactInfo: string;
    Supp_email: string;
    Supp_phoneNumber: string;
    Supp_city: string;
    Supp_address: string;
  };

  User: {
    User_name: string;
    User_surname: string;
  };

  Item: {
    Item_id: number;
    ItItem_unitCost: Decimal;
    Item_qtyOrdered: number;
    Item_totalAmount: Decimal;
    Item_qtyReceived: number;
    Item_location: string;
    Item_status: string;
    Item_prodId: number;
    Item_procId: number;
    Product: {
      Prod_name: string;
      Prod_desc: string;
      Prod_ref: string;
      Prod_unitMeasure: string;
      Category: {
        Cat_name: string;
      };
    };
  };
};
