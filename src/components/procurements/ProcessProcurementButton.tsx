"use client";

import { useItemStore, useProcurementStore } from "@/store";
import { LockIcon } from "lucide-react";

export const ProcessProcurementButton = () => {
  const { toggleProcessProcurementModal, setProId, procurementDetails } =
    useProcurementStore();

  const { items } = useItemStore();

  const handleCloseProcurement = () => {
    if (!procurementDetails) return;
    setProId(procurementDetails?.Pro_id);
    toggleProcessProcurementModal();
  };

  if (!items || !procurementDetails) {
    return;
  }

  return (
    <button
      className={`flex gap-1 justify-center items-center  rounded-md px-2 py-1 text-white transition-colors  ${
        items.length < 1 ? "bg-gray-500" : "bg-red-600 hover:bg-red-800"
      }
                 `}
      disabled={items.length < 1}
      onClick={handleCloseProcurement}
    >
      <LockIcon className={`w-5`} />
      Procesar para pago
    </button>
  );
};
