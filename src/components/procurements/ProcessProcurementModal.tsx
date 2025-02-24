"use client";

import { useState } from "react";
import { LoadingSpinner } from "../UI";
import { LockIcon, TriangleAlertIcon, XIcon } from "lucide-react";
import { useProcurementStore } from "@/store";
import { useProcurement } from "@/hooks/useProcurement";
import { toast } from "react-toastify";

export const ProcessProcurementModal = () => {
  const {
    toggleProcessProcurementModal,
    clearProId,
    proId,
    procurementDetails,
    updateProcurements,
    setDetailManager,
  } = useProcurementStore();

  const { processProcurement } = useProcurement();

  const [loading, setLoading] = useState<boolean>(false);

  const handleCancel = () => {
    toggleProcessProcurementModal();
    clearProId();
  };

  const handleProcess = async () => {
    setLoading(true);

    if (!proId || !procurementDetails) return;

    try {
      const { ok, data, message } = await processProcurement(proId);
      if (ok && data) {
        toast.success(message);
        updateProcurements("update", data);
        toggleProcessProcurementModal();
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
            <TriangleAlertIcon
              className={`absolute top-2 left-2 text-yellow-400`}
              strokeWidth={3}
            />
            <button
              className={`absolute top-2 right-2 "bg-red-800 hover:bg-teal-800`}
              onClick={handleCancel}
            >
              <XIcon
                className={`  text-yellow-400 cursor-pointer`}
                strokeWidth={3}
              />
            </button>
            <h2
              className={`bg-teal-700  dark:bg-teal-800  text-center text-white uppercase font-bold py-3 `}
            >
              Alerta
            </h2>
          </div>
          <div className={`p-4`}>
            <p className={`text-center font-medium`}>
              ¿Realmente deseas cerrar la compra?
            </p>
            <p className={`text-center`}>
              Recuerda que una vez cerrada ya no la podrás editar o actualizar{" "}
            </p>

            <button
              className={`flex gap-1 justify-center items-center  rounded text-white mx-auto mt-5 uppercase font-semibold shadow-md bg-teal-700 hover:bg-teal-600 dark:bg-teal-800 dark:hover:bg-teal-600 transition-all duration-700 w-28 md:w-32`}
              onClick={handleProcess}
            >
              {loading ? (
                <LoadingSpinner />
              ) : (
                <>
                  <LockIcon className={`w-5`} /> Cerrar Compra
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
