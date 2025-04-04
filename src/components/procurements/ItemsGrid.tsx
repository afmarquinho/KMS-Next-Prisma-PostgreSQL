"use client";

import { ItemCard } from "./items/ItemCard";
import { DeleteProcurementButton } from "./DeleteProcurementButton";
import { itemStore, procurementStore } from "@/store";
import { ProcessProcurementButton } from "./ProcessProcurementButton";
import { DeleteItemModal } from "./items/DeleteItemModal";
import { DeleteProcurementModal } from "./DeleteProcurementModal";
import { ProcessProcurementModal } from "./ProcessProcurementModal";

export const ItemsGrid = () => {
  const { items, deleteItemModalOpen } = itemStore();
  const { procurementDetails, deleteProcurementModalOpen, processProcurementModalOpen} = procurementStore();

  if (!items || !procurementDetails) return;
  return (
    <>
      <h2 className={`font-bold text-center text-base uppercase pb`}>Items</h2>
      {items.length === 0 ? (
        <p className={`text-base italic font-semibold`}>
          Esta órden aún no tiene productos asociados
        </p>
      ) : (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5`}>
          {items.map((item, i) => (
            <ItemCard
              key={i}
              item={item}
              procurementStatus={procurementDetails.Proc_processed}
            />
          ))}
        </div>
      )}

      {!procurementDetails?.Proc_processed && (
        <div
          className={`w-full bg-red-600 bg-opacity-10 border-4 border-red-600 dark:border-red-300 p-5 `}
        >
          <p
            className={`text-red-600 dark:text-red-200 font-bold uppercase mb-2`}
          >
            Zona de Peligro
          </p>
          <div className={`flex gap-5`}>
            <ProcessProcurementButton />
            <DeleteProcurementButton />
          </div>
        </div>
      )}
      {deleteItemModalOpen && <DeleteItemModal />}
      {deleteProcurementModalOpen && <DeleteProcurementModal />}
      {processProcurementModalOpen && <ProcessProcurementModal />}
    </>
  );
};
