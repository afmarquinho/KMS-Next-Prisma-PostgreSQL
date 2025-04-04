"use client";

import { itemStore, procurementStore } from "@/store";
import { LockIcon } from "lucide-react";
import { Button } from "../UI/Button";

export const ProcessProcurementButton = () => {
  const { toggleProcessProcurementModal, setProId, procurementDetails } =
    procurementStore();

  const { items } = itemStore();

  const handleProcessProcurement = () => {
    if (!procurementDetails) return;
    setProId(procurementDetails?.Proc_id);
    toggleProcessProcurementModal();
  };

  if (!items || !procurementDetails) {
    return;
  }

  return (
    <Button
      disabled={items.length < 1}
      onClick={handleProcessProcurement}
      className={`w-40 h-8 md:h-10`}
    >
      <LockIcon className={`w-5`} /> Procesar para pago
    </Button>
  );
};
