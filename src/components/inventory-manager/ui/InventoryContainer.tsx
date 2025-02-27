"use client";

import { useInventoryStore } from "@/store";
import { CategoryContent } from "../category/CategoryContent";
import { InventoryContent } from "../inventory/InventoryContent";
import { ProcurementContent } from "../procurement/ProcurementContent";
import { DispatchRequests } from "../inventory/DispatchRequests";



export const InventoryContainer = () => {
  const {
    categoryModalOpen,
    purchaseModalOpen,
    inventoryModalOpen,
    requestsModalOpen,
  } = useInventoryStore();

  return (
    <>
      {purchaseModalOpen && <ProcurementContent />}
      {inventoryModalOpen && <InventoryContent />}
      {requestsModalOpen && <DispatchRequests />}
      {categoryModalOpen && <CategoryContent />}
    </>
  );
};