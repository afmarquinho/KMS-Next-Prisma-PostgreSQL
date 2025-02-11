import { Prisma } from "@prisma/client";

export type CurrentViewCustomerPage = "list" | "form";

export type CustomerPost = {
  Customer_dni: number;
  Customer_name: string;
  Customer_surname: string;
  Customer_email: string;
  Customer_phoneNumber: string;
  Customer_address: string;
  Customer_habeasData: boolean;
};
export type CustomerDetails = Prisma.CustomerGetPayload<{
  select: {
    Customer_id: true;
    Customer_address: true;
    Customer_dni: true;
    Customer_email: true;
    Customer_habeasData: true;
    Customer_name: true;
    Customer_surname: true;
    Customer_phoneNumber: true;
    Customer_registrationDate: true;
    Customer_userId: true;
    Sales: true;
  };
}>;
