import { Prisma } from "@prisma/client";

export type CurrentViewCustomerPage = "list" | "form";

export type CustomerPost = {
  Cust_dni: number;
  Cust_name: string;
  Cust_surname: string;
  Cust_email: string;
  Cust_phoneNumber: string;
  Cust_address: string;
  Cust_habeasData: boolean;
};
export type CustomerDetails = Prisma.CustomerGetPayload<{
  select: {
    Cust_id: true;
    Cust_address: true;
    Cust_dni: true;
    Cust_email: true;
    Cust_habeasData: true;
    Cust_name: true;
    Cust_surname: true;
    Cust_phoneNumber: true;
    Cust_registrationDate: true;
   createdBy: true;
    Sales: true;
  };
}>;
