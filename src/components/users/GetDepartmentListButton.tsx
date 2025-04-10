"use client";

import { EllipsisIcon } from "lucide-react";
import { LoadingSpinner } from "../UI";
import { toast } from "react-toastify";
import { departmentStore } from "@/store";
import { useState } from "react";
import { useDepartment } from "@/hooks/useDepartments";

export const GetDepartmentListButton = () => {
  const { setDepartments } = departmentStore();
  const [loading, setLoading] = useState<boolean>(false);
  const { getDepartments } = useDepartment();

  const handleGetDepartments = async () => {
    setLoading(true);

    try {
      const res = await getDepartments();
      // const { ok, data, message } = res;
      const { ok, data } = res;

      if (ok) {
        setDepartments(data);
      } else {
        toast.error("Error al obtener los usuarios");
      }
    } catch (error) {
      console.error("Error de red:", error);
      toast.error("Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGetDepartments}
      disabled={loading}
      className={`bg-gradient-to-b from-slate-300 to-slate-400 hover:to-slate-400 hover:from-slate-400 text-slate-900 rounded p-1 w-10 h-full flex items-center justify-center`}
    >
      {loading ? <LoadingSpinner /> : <EllipsisIcon />}
    </button>
  );
};
