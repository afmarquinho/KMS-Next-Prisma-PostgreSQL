"use client";

import { ItemCard } from "./items/ItemCard";
import { DeleteProcurementButton } from "./DeleteProcurementButton";
import { useItemStore, useProcurementStore } from "@/store";
import { ProcessProcurementButton } from "./ProcessProcurementButton";
import { DeleteItemModal } from "./items/DeleteItemModal";
import { DeleteProcurementModal } from "./DeleteProcurementModal";
import { ProcessProcurementModal } from "./ProcessProcurementModal";

export const ProcurementGrid = () => {
  const { items: itemDetails, deleteItemModalOpen } = useItemStore();
  const { procurementDetails, deleteProcurementModalOpen, processProcurementModalOpen} = useProcurementStore();

  if (!itemDetails || !procurementDetails) return;
  return (
    <>
      <h2 className={`font-bold text-center text-base uppercase pb`}>Items</h2>
      {itemDetails.length === 0 ? (
        <p className={`text-base italic font-semibold`}>
          Esta órden aún no tiene productos asociados
        </p>
      ) : (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5`}>
          {itemDetails.map((item, i) => (
            <ItemCard
              key={i}
              item={item}
              procurementStatus={procurementDetails.Pro_processed}
            />
          ))}
        </div>
      )}

      {!procurementDetails?.Pro_processed && (
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
