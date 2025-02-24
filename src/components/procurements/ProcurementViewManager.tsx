"use client";

import { useProcurementStore} from "@/store/procurementStore";
import { ProcurementTable } from "./ProcurementTable";
import { ProcurementForm } from "./ProcurementForm";

export const ProcurementViewManager = () => {
    const { currentView } = useProcurementStore();

 const views = {
    list: <ProcurementTable />,
    form: <ProcurementForm />,
  };
  return views[currentView] || <ProcurementTable />;
}