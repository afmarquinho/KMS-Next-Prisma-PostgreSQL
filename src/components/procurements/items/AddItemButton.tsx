"use client";

import { Button } from "@/components/UI/Button";
import { useItemStore } from "@/store";
import { PlusIcon } from "lucide-react";

export const AddItemButton = () => {
  const { toggleItemModal, clearItem } = useItemStore();

  const handleAddItem = () => {
    toggleItemModal();
    clearItem();
  };

  return (
    <>
      <Button className={`w-32 md:w-40 md:h-[2.5rem]`} onClick={handleAddItem}>
        <PlusIcon className={`w-5 h-5`} />
        Agregar Item
      </Button>
    </>
  );
};
