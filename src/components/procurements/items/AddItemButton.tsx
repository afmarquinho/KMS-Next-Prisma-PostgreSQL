"use client";

import { useItemStore } from "@/store";
import { PlusIcon } from "lucide-react";
import { ItemForm } from "./ItemForm";

export const AddItemButton = () => {
  const { itemModalOpen, toggleItemModal, clearItem} = useItemStore();

  const handleAddItem = () => {
    toggleItemModal();
    clearItem()
  };

  return (
    <>
      <button
        className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded shadow-md hover:bg-indigo-700 transition-all flex gap-1 items-center justify-center"
        onClick={handleAddItem}
      >
        <PlusIcon className={`w-5`} />
        Agregar Item
      </button>
      {itemModalOpen && <ItemForm />}
    </>
  );
};
