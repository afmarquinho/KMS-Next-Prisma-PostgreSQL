"use client";

import { customerStore } from "@/store";
import { CustomerListButton } from "./CustomerListButton";
import { CustomerViewManager } from "./CustomerViewManager";
import { NewCustomerButton } from "./NewCustomerButton";
import { CustomerDetails } from "./CustomerDetails";
import Link from "next/link";
import { Undo2Icon } from "lucide-react";

export const CustomerContainer = () => {
  const { detailManager } = customerStore();
  return (
    <>
      {detailManager ? (
        <CustomerDetails />
      ) : (
        <>
          <div className={`flex flex-row items-center justify-between`}>
            <div className={`flex gap-2`}>
              <CustomerListButton />
              <NewCustomerButton />
            </div>

            <Link
              href="/masters"
              className={`p-2 gap-2 flex justify-center items-center transition-all duration-300 rounded text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-gray-600`}
            >
              <Undo2Icon className={`w-5`} />
              Atrás
            </Link>
          </div>

          <CustomerViewManager />
        </>
      )}{" "}
    </>
  );
};
