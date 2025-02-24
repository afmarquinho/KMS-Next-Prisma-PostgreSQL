import { Procurement } from "@prisma/client";

export type ProcurementType = Procurement & {
  Supplier: {
    Supp_name: string;
  };
};


export type ProcurementDetailsType = Omit<Procurement, "Item"> & {
  Supplier: {
    Supp_nit: number;
    Supp_contactInfo: string;
    Supp_email: string;
    Supp_phoneNumber: string;
    Supp_name: string;
  };
  User: {
    User_name: string;
    User_surname: string;
  };
};
