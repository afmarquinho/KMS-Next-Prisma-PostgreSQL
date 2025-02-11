"use client";
import { useState } from "react";
import { TriangleAlert, X, CirclePower } from "lucide-react";
import { toast } from "react-toastify";
import { useSupplierStore } from "@/store";
import { LoadingSpinner } from "../UI";
import { useSuppliers } from "@/hooks/useSuppliers";

export const ActiveSupplierModal = () => {
  const {
    toggleActiveModal,
    supplierDetails,
    setSupplierDetails,
    updateSuppliers,
  } = useSupplierStore();
  const { activeStatus } = useSuppliers();

  const [loading, setLoading] = useState<boolean>(false);

  const handleActive = async () => {
    setLoading(true);

    try {
      if (!supplierDetails) return;
      const { ok, data, message } = await activeStatus(
        supplierDetails?.Supplier_id
      );
      if (ok && data) {
        setSupplierDetails(data);
        updateSuppliers("update", data);
        toast.success("Estado actualizado correctamente");
        toggleActiveModal();
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-80 z-20 flex justify-center items-center backdrop-blur-[1px]`}
    >
      <div className={`w-full max-w-96 bg-white dark:bg-slate-700`}>
        <div className={`relative`}>
          <TriangleAlert
            className={`absolute top-2 left-2 text-yellow-400`}
            strokeWidth={3}
          />
          <button
            className={`absolute top-2 right-2 ${
              supplierDetails?.Supplier_active
                ? "bg-red-800 hover:bg-red-950"
                : "bg-green-800 hover:bg-green-950"
            }`}
            onClick={toggleActiveModal}
          >
            <X className={`  text-yellow-400 cursor-pointer`} strokeWidth={3} />
          </button>
          <h2
            className={`bg-gradient-to-b  text-center text-white uppercase font-bold py-3 ${
              supplierDetails?.Supplier_active
                ? "from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                : "from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
            }`}
          >
            Alerta
          </h2>
        </div>
        <div className={`p-4`}>
          <p className={`text-center`}>
            ¿Realmente deseas{" "}
            {supplierDetails?.Supplier_active ? "Desactivar" : "Activar"} al
            proveedor{" "}
            <span className={`font-bold`}>
              {supplierDetails?.Supplier_name}
            </span>
          </p>

          <button
            className={`w-32 h-8 flex gap-1 justify-center items-center  rounded text-white transition-all mx-auto mt-5 uppercase font-semibold shadow-md bg-gradient-to-b ${
              supplierDetails?.Supplier_active
                ? "from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                : "from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
            }`}
            onClick={handleActive}
            disabled={loading}
          >
            {loading ? (
              <LoadingSpinner />
            ) : (
              <>
                <CirclePower className={`w-5`} />

                {supplierDetails?.Supplier_active ? "Desactivar" : "Activar"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
