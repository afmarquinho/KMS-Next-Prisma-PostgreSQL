"use client";

import { LoadingSpinner } from "@/components/UI";
import { useSuppliers } from "@/hooks/useSuppliers";
import { supplierStore } from "@/store";
import { EllipsisIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export const GetSupplierListButton = () => {
  const { setSupplierList } = supplierStore();
  const { getSupplierList } = useSuppliers();
  const [loading, setLoading] = useState<boolean>(false);

  const handleGet = async () => {
    setLoading(true);
    try {
      const { ok, data, message } = await getSupplierList();
      if (ok && data) {
        setSupplierList(data);
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
    <button
      type="button"
      onClick={handleGet}
      className={`bg-gradient-to-b from-slate-300 to-slate-500 hover:from-slate-500 hover:to-slate-500 w-7 h-6 flex justify-center items-center rounded`}
    >
      {loading ? <LoadingSpinner /> : <EllipsisIcon className={`w-5`} />}
    </button>
  );
};
