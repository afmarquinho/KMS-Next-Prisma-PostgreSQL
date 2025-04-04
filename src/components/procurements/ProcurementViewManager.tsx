"use client";

import { procurementStore} from "@/store/procurementStore";
import { ProcurementTable } from "./ProcurementTable";
import { ProcurementForm } from "./ProcurementForm";

export const ProcurementViewManager = () => {
    const { currentView } = procurementStore();

 const views = {
    list: <ProcurementTable />,
    form: <ProcurementForm />,
  };
  return views[currentView] || <ProcurementTable />;
}