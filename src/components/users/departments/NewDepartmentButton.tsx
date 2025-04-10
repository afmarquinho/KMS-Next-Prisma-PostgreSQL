import { departmentStore } from "@/store";
import { LayoutGridIcon } from "lucide-react";
import { MainButton } from "../../UI";

export const NewDepartmentButton = () => {
  const { toggleCurrentView, currentView } = departmentStore();

  const handleView = () => {
    toggleCurrentView("form");
  };
  return (
    <div>
      <MainButton
        variant="primary"
        className={`${
          currentView === "form"
            ? "bg-indigo-900 dark:bg-teal-700 text-slate-200"
            : "bg-white dark:bg-transparent hover:bg-teal-900 hover:dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:text-slate-200"
        }`}
        onClick={handleView}
      >
        <LayoutGridIcon className={`w-5 h-5`} />
        Nuevo
      </MainButton>
    </div>
  );
};
