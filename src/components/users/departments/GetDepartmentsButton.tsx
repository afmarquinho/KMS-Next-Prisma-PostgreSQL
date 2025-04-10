"use client";

import { LoadingSpinner, MainButton } from "@/components/UI";
import { useDepartment } from "@/hooks/useDepartments";
import { departmentStore } from "@/store";
import { Grid2x2PlusIcon, RefreshCcwIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export const GetDepartmentsButton = () => {
  const { departments, setDepartments } = departmentStore();
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
    <MainButton
      variant="tertiary"
      onClick={handleGetDepartments}
      disabled={loading}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {!departments ? (
            <Grid2x2PlusIcon className={`w-5 h-5`} />
        
          ) : departmentStore.length > 1 ? (
            <RefreshCcwIcon className={`w-5 h-5`} />
          ) : (
            <Grid2x2PlusIcon className={`w-5 h-5`} />
          )}
          {!departments ? "Ver todos" : departments.length > 1 ? "Resfrescar" : "Ver todos"}
        </>
      )}
    </MainButton>
  );
};
