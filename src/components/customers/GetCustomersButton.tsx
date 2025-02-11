"use client";

import {
  RefreshCcwIcon,
  ShoppingCartIcon,
  SlidersHorizontalIcon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { LoadingSpinner } from "../UI/LoadingSpinner";
import { useCustomers } from "@/hooks";
import { useCustomerStore } from "@/store";

export const GetCustomersButton = () => {
  const { getAllCustomers } = useCustomers();
  const { setCustomers, customers } = useCustomerStore();
  const [loading, setLoading] = useState<boolean>(false);

  const handleGetCustomers = async () => {
    setLoading(true);
    try {
      const { ok, data, message } = await getAllCustomers();
      if (ok && data) {
        setCustomers(data);
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
        onClick={handleGetCustomers}
        disabled={loading || customers?.length === 0}
      >
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {!customers ? (
              <ShoppingCartIcon className={`w-5`} />
            ) : customers.length > 1 ? (
              <RefreshCcwIcon className={`w-5`} />
            ) : (
              <ShoppingCartIcon className={`w-5`} />
            )}
            {!customers
              ? "Ver todos"
              : customers.length > 1
              ? "Resfrescar"
              : "Ver todos"}
          </>
        )}
      </button>
    </div>
  );
};
