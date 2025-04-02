"use client";

import { useInventoryStore } from "@/store";
import { InventoryContent } from "../inventory/InventoryContent";
import { ProcurementContent } from "../procurement/ProcurementContent";
import { ReferenceContent } from "../inventory/ReferenceContent";


export const InventoryContainer = () => {
  const {
    procurementModalOpen,
    inventoryModalOpen,
    referenceModalOpen
  } = useInventoryStore();

  return (
    <>
      {procurementModalOpen && <ProcurementContent />}
      {inventoryModalOpen && <InventoryContent />}
      {referenceModalOpen && <ReferenceContent />}
    </>
  );
};
