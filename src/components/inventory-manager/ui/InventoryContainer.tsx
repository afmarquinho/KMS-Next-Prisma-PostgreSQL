"use client";

import { useInventoryStore } from "@/store";
import { CategoryContent } from "../category/CategoryContent";
import { InventoryContent } from "../inventory/InventoryContent";
import { ProcurementContent } from "../procurement/ProcurementContent";
import { DispatchRequests } from "../inventory/DispatchRequests";

export const InventoryContainer = () => {
  const {
    categoryModalOpen,
    procurementModalOpen,
    inventoryModalOpen,
    requestsModalOpen,
  } = useInventoryStore();

  return (
    <>
      {procurementModalOpen && <ProcurementContent />}
      {inventoryModalOpen && <InventoryContent />}
      {requestsModalOpen && <DispatchRequests />}
      {categoryModalOpen && <CategoryContent />}
    </>
  );
};
