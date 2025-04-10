import { DepartmentListButton } from "./DepartmentListButton";
import { DepartmentViewManager } from "./DepartmentViewManager";
import { NewDepartmentButton } from "./NewDepartmentButton";



export const DepartmentsManager = () => {
  return (
    <>
      <div className={`flex gap-2`}>
        <DepartmentListButton />
        <NewDepartmentButton />
      </div>
      <DepartmentViewManager />
    </>
  );
};
