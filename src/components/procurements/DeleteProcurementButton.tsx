"use client";

import { useItemStore, useProcurementStore } from "@/store";
import { TrashIcon } from "lucide-react";

export const DeleteProcurementButton = () => {
  const { toggleDeleteProcurementModal, procurementDetails, setProId } =
    useProcurementStore();
  const { items } = useItemStore();

  const handleDetele = () => {
    if (!procurementDetails) return;
    
    toggleDeleteProcurementModal();
    setProId(procurementDetails?.Pro_id);
  };

  if (!items || !procurementDetails) {
    return;
  }
  return (
    <button
      className={`flex gap-1 justify-center items-center  rounded-md px-2 py-1 text-white transition-colors ${
        items.length > 0 ? "bg-gray-500" : "bg-black"
      }
               `}
      disabled={items.length > 0}
      onClick={handleDetele}
    >
      <TrashIcon className={`w-5`} />
      Eliminar Compra
    </button>
  );
};
