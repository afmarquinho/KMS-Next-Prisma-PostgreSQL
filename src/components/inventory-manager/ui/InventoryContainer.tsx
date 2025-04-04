"use client";

import { inventoryStore } from "@/store";
import { InventoryContent } from "../inventory/InventoryContent";
import { ProcurementContent } from "../procurement/ProcurementContent";
import { ReferenceContent } from "../inventory/ReferenceContent";


export const InventoryContainer = () => {
  const {
    procurementModalOpen,
    inventoryModalOpen,
    referenceModalOpen
  } = inventoryStore();

  return (
    <>
      {procurementModalOpen && <ProcurementContent />}
      {inventoryModalOpen && <InventoryContent />}
      {referenceModalOpen && <ReferenceContent />}
    </>
  );
};
