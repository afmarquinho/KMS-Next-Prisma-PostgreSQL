"use client";

import { useCustomerStore } from "@/store";
import { CustomersTable } from "./CustomersTable";
import { CustomerForm } from "./CustomerForm";

export const CustomerViewManager = () => {
  const { currentView } = useCustomerStore();

  const views = {
    list: <CustomersTable />,
    form: <CustomerForm />,
  };

  return views[currentView] || <CustomersTable />;
};
