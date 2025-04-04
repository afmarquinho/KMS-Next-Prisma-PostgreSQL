"use client";

import { procurementStore } from "@/store/procurementStore";
import { NewProcurementButton } from "./NewProcurementButton";
import { ProcurementDetails } from "./ProcurementDetails";
import { ProcurementListButton } from "./ProcurementListButton";
import { ProcurementViewManager } from "./ProcurementViewManager";

export const ProcurementContainer = () => {
  const { detailManager } = procurementStore();
  return (
    <>
      {detailManager ? (
        <ProcurementDetails />
      ) : (
        <>
          <div className={`flex flex-row items-center justify-between`}>
            <div className={`flex gap-2`}>
              <ProcurementListButton />
              <NewProcurementButton />
            </div>
          </div>
          <ProcurementViewManager />
        </>
      )}
    </>
  );
};
