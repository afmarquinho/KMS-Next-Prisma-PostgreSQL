"use client";

import { customerStore } from "@/store";
import { ShoppingBagIcon } from "lucide-react";

export const NewCustomerButton = () => {

const { toggleCurrentView, currentView, customer } = customerStore();

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
      <ShoppingBagIcon className={`w-5`} />
      {customer ? "Editar Cliente": "Nuevo Cliente"}
    </button>
  )
}