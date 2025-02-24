"use client";

import { LoadingSpinner } from "@/components/UI";
import { useCategories } from "@/hooks/useCategories";
import { useCategoryStore } from "@/store/categoryStore";
import { EllipsisIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export const GetCategoriesButton = () => {
  const { setCategories } = useCategoryStore();
  const { getCategories } = useCategories();
  const [loading, setLoading] = useState<boolean>(false);

  const handleGet = async () => {
    setLoading(true);
    try {
      const { ok, data, message } = await getCategories();
      if (ok && data) {
        setCategories(data);
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
      className={`bg-gradient-to-b from-slate-300 to-slate-500 hover:from-slate-500 hover:to-slate-500 w-7 h-7 flex justify-center items-center rounded`}
    >
      {loading ? <LoadingSpinner /> : <EllipsisIcon className={`w-5`} />}
    </button>
  );
};
