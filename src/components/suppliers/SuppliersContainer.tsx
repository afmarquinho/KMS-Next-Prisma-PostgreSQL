"use client";

import Link from "next/link";
import { NewSupplierButton } from "./NewSupplierButton";
import { SupplierDetails } from "./SupplierDetails";
import { SupplierListButton } from "./SupplierListButton";
import { Undo2Icon } from "lucide-react";
import SupplierViewManager from "./SupplierViewManager";
import { supplierStore } from "@/store";

export const SuppliersContainer = () => {
  const { detailManager } = supplierStore();
  return (
    <>
      {detailManager ? (
        <SupplierDetails />
      ) : (
        <>
          <div className={`flex flex-row items-center justify-between`}>
            <div className={`flex gap-2`}>
              <SupplierListButton />
              <NewSupplierButton />
            </div>
            <div>
              <Link
                href="/masters"
                className={`p-2 gap-2 flex justify-center items-center transition-all duration-300 rounded text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-gray-600`}
              >
                <Undo2Icon className={`w-5`} />
                Atrás
              </Link>
            </div>
          </div>
          <SupplierViewManager />
        </>
      )}
    </>
  );
};
