"use client";

import { useSuppliers } from "@/hooks/useSuppliers";
import { useSupplierStore } from "@/store";
import { RefreshCcwIcon, ShoppingCartIcon, SlidersHorizontalIcon } from "lucide-react"
import { useState } from "react";
import { toast } from "react-toastify";
import { LoadingSpinner } from "../UI";

export const GetSuppliersButton = () => {
const { getAllSuppliers } = useSuppliers();

  const { setSuppliers, suppliers } = useSupplierStore();
    const [loading, setLoading] = useState<boolean>(false);

  const handleGetSuppliers = async () => {
    setLoading(true);
    try {
      const { ok, data, message } = await getAllSuppliers();
      if (ok && data) {
        setSuppliers(data);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error("Error de red:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={`flex gap-5`}>
    <button
      className={`hover:bg-slate-300 dark:hover:bg-slate-800 p-2 rounded`}
    >
      <SlidersHorizontalIcon className={`w-5`} />
    </button>
    <button
      className={`bg-white dark:bg-transparent hover:bg-teal-900 hover:dark:bg-slate-900 border-white dark:border-slate-300 hover:text-slate-200 w-28 md:w-32 md:px-0 h-10 flex justify-center items-center gap-1 text-xs shadow-md p-2 border-2 transition-all duration-300 rounded`}
      onClick={handleGetSuppliers}
      disabled={loading || suppliers?.length === 0}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {!suppliers ? (
            <ShoppingCartIcon className={`w-5`} />
          ) : suppliers.length > 1 ? (
            <RefreshCcwIcon className={`w-5`} />
          ) : (
            <ShoppingCartIcon className={`w-5`} />
          )}
          {!suppliers
            ? "Ver todos"
            : suppliers.length > 1
            ? "Resfrescar"
            : "Ver todos"}
        </>
      )}
    </button>
  </div>
  )
}