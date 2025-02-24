"use client";

import { TrashIcon, TriangleAlert, X } from "lucide-react";
import { useState } from "react";
import { LoadingSpinner } from "../UI/LoadingSpinner";
import { toast } from "react-toastify";
import { useProcurementStore } from "@/store";
import { useProcurement } from "@/hooks/useProcurement";

export const DeleteProcurementModal = () => {
  const {
    toggleDeleteProcurementModal,
    proId,
    clearProId,
    setDetailManager,
    updateProcurements, procurementDetails
  } = useProcurementStore();
  const { deleteProcurement } = useProcurement();
  const [loading, setLoading] = useState<boolean>(false);

  const handleCancel = () => {
    toggleDeleteProcurementModal();
    clearProId();
  };

  const handleDelete = async () => {
    setLoading(true);
    if (!proId || !procurementDetails) return;

    try {
      const { ok, data, message } = await deleteProcurement(proId);
      if (ok && data) {
        toast.success(message);
        updateProcurements("delete", data);
        toggleDeleteProcurementModal();
        clearProId();
        setDetailManager(false);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className={`fixed inset-[-100px] bg-black bg-opacity-60 dark:bg-opacity-80 z-20 flex justify-center items-center backdrop-blur-[1px]`}
      >
        <div
          className={`w-full max-w-96 bg-white dark:bg-slate-700 rounded overflow-hidden`}
        >
          <div className={`relative`}>
            <TriangleAlert
              className={`absolute top-2 left-2 text-yellow-400`}
              strokeWidth={3}
            />
            <button
              className={`absolute top-2 right-2 "bg-red-800 hover:bg-red-950`}
              onClick={handleCancel}
            >
              <X className={`text-yellow-400 cursor-pointer`} strokeWidth={3} />
            </button>
            <h2
              className={`bg-gradient-to-b  text-center text-white uppercase font-bold py-3 from-gray-800 to-black dark:from-red-700 dark:to-red-800`}
            >
              Alerta
            </h2>
          </div>
          <div className={`p-4`}>
            <p className={`text-center`}>
              <span className={`font-bold text-base`}>
                ¿Realmente deseas eliminar esta compra?
              </span>
              <br /> Recuerda que una vez eliminada todos los datos se borrarán
              y no podrás recuperarlos.
            </p>

            <button
              className={`flex gap-1 justify-center items-center text-white mx-auto mt-5 uppercase font-semibold shadow-md bg-gradient-to-b from-gray-800 to-gray-950 hover:from-black hover:to-black dark:from-gray-950 dark:to-black dark:hover:from-gray-900 dark:hover:to-gray-950 transition-all duration-700 rounded w-28 md:w-32 h-8 md:h-10`}
              onClick={handleDelete}
            >
              {loading ? (
                <LoadingSpinner />
              ) : (
                <>
                  <TrashIcon className={`w-5`}/> Eliminar
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
