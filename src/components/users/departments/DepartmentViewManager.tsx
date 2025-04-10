import { departmentStore } from "@/store";
import { DepartmentForm } from "./DepartmentForm";
import { DepartmentsTable } from "./DepartmentsTable";

export const DepartmentViewManager = () => {
  const { currentView } = departmentStore();

  const views = {
    list: <DepartmentsTable />,
    form: <DepartmentForm />,
  };

  return views[currentView] || <DepartmentsTable />;
};
