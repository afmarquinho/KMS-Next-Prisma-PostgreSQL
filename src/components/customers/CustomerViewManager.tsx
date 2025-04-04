"use client";

import { customerStore } from "@/store";
import { CustomersTable } from "./CustomersTable";
import { CustomerForm } from "./CustomerForm";

export const CustomerViewManager = () => {
  const { currentView } = customerStore();

  const views = {
    list: <CustomersTable />,
    form: <CustomerForm />,
  };

  return views[currentView] || <CustomersTable />;
};
