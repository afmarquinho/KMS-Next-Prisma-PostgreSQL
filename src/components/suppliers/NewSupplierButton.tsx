"use client";

import { supplierStore } from "@/store";
import { BaggageClaimIcon } from "lucide-react";

export const NewSupplierButton = () => {
  const { toggleCurrentView, currentView, supplier } = supplierStore();

  const handleView = () => {
    toggleCurrentView("form");
  };

  return (
    <button
      className={`border-white dark:border-slate-300 hover:text-slate-200 backdrop:w-36 md:w-40 md:px-0 h-10 flex justify-center items-center gap-1 text-xs shadow-md p-2 border-2 transition-all duration-300 rounded ${
        currentView === "form"
          ? "bg-indigo-900 dark:bg-teal-700 text-slate-200"
          : "bg-white dark:bg-transparent hover:bg-teal-900 hover:dark:bg-slate-900"
      } `}
      onClick={handleView}
    >
      <BaggageClaimIcon  className={`w-5`} />
      {supplier ? "Editar Proveedor" : "Nuevo Proveedor"}
    </button>
  );
};
