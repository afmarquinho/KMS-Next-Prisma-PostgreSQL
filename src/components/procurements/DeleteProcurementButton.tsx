"use client";

import { useItemStore, useProcurementStore } from "@/store";
import { TrashIcon } from "lucide-react";
import { Button } from "../UI/Button";

export const DeleteProcurementButton = () => {
  const { toggleDeleteProcurementModal, procurementDetails, setProId } =
    useProcurementStore();
  const { items } = useItemStore();

  const handleDetele = () => {
    if (!procurementDetails) return;

    toggleDeleteProcurementModal();
    setProId(procurementDetails?.Proc_id);
  };

  if (!items || !procurementDetails) {
    return;
  }
  return (
    <Button
    variant="danger"
      className={`w-40 h-8 md:h-10 ${
        items.length > 0 ? "bg-gray-500" : "bg-black"
      }`}
      disabled={items.length > 0}
      onClick={handleDetele}
    >
      <TrashIcon className={`w-5`} />
      Eliminar Compra
    </Button>
  );
};
