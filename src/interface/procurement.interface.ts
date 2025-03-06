import { Procurement } from "@prisma/client";

export type ProcurementType = Omit<
  Procurement,
  "Pro_totalAmount" | "Pro_date" | "Pro_dueDate"
> & {
  Pro_totalAmount: string;
  Pro_date: string;
  Pro_dueDate: string;
  Supplier: {
    Supp_name: string;
  };
};

// export type ProcurementDetailsType = Omit<Procurement, "Pro_totalAmount" | " Pro_dueDate"& {
//   Supplier: {
//     Supp_id: number;
//     Supp_nit: number;
//     Supp_name: string;
//     Supp_contactInfo: string;
//     Supp_email: string;
//     Supp_phoneNumber: string;
//     Supp_city: string;
//     Supp_address: string;
//     Supp_active: boolean;
//   };
//   Item: {
//     Item_id: number;
//     Item_ref: string;
//     Item_name: string;
//     Item_desc: string;
//     Item_qtyOrdered: number;
//     Item_location: string;
//     Item_qtyReceived: number;
//     Item_status: string;
//     Category: {
//       Cat_id: number;
//       Cat_name: string;
//     };
//   };

//   ProcurementNote: {
//     Note_id: number;
//     Note_content: string;
//     Note_createdAt: string;
//     User: {
//       User_name: string;
//       User_surename: string;
//     };
//   };

//   User: {
//     User_name: string;
//     User_surname: string;
//   };
// };
