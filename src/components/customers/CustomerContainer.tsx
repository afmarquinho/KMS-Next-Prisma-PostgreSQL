"use client";

import { useCustomerStore } from "@/store";
import { CustomerListButton } from "./CustomerListButton";
import { CustomerViewManager } from "./CustomerViewManager";
import { NewCustomerButton } from "./NewCustomerButton";
import { CustomerDetails } from "./CustomerDetails";

export const CustomerContainer = () => {
  const { detailManager } = useCustomerStore();
  return (
    <>
      {detailManager ? (
        <CustomerDetails />
      ) : (
        <>
          <div className={`flex gap-2`}>
            <CustomerListButton />
            <NewCustomerButton />
          </div>
          <CustomerViewManager />
        </>
      )}{" "}
    </>
  );
};
