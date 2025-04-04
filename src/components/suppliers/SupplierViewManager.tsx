"use client";

import { supplierStore } from "@/store";
import { SuppliersTable } from "./SuppliersTable";
import { SupplierForm } from "./SupplierForm";

const SupplierViewManager = () => {
  const { currentView } = supplierStore();

  const views = {
    list: <SuppliersTable />,
    form: <SupplierForm />,
  };

  return views[currentView] || <SuppliersTable />;
};
export default SupplierViewManager;
