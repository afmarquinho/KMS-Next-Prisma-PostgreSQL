"use client";

import { departmentStore } from "@/store";
import { GetDepartmentsButton } from "./GetDepartmentsButton";
import { FilePenLineIcon } from "lucide-react";
import { Departments } from "@prisma/client";

export const DepartmentsTable = () => {
  const { departments, toggleCurrentView } = departmentStore();
  

    const handleEdit = (dep: Departments) => {
      console.log(dep);
      toggleCurrentView("form");
    };

  if (!departments || departments.length === 0) {
    const message = !departments
      ? 'No hay departamentos para visualizar, presiona el botón "Ver Departamentos".'
      : "No hay departamentos en la base de datos.";

    return (
      <>
        <GetDepartmentsButton />
        <div className="italic font-medium text-base">{message}</div>
        {/* {userModalOpen && <UserModal />} */}
      </>
    );
  }
  return (
    <>
      <GetDepartmentsButton />
      <div className="overflow-auto my-5 bg-white p-5 dark:bg-slate-900 rounded">
        <table
          className={`w-full rounded border-collapse text-left overflow-hidden shadow-md`}
        >
          <thead
            className={`bg-indigo-900 text-slate-200 border-b-8 border-b-blue-600 dark:border-b-blue-800`}
          >
            <tr>
              <th className={`py-3 px-2`}>Item</th>
              <th className={`py-3 px-1`}>Departamento</th>
              <th className={`py-3 px-1`}>Editar</th>
            
            </tr>
          </thead>
          <tbody className={`px-10`}>
            {departments.map((dep, i) => (
              <tr
                key={dep.Dep_id}
                className={`dark:border-slate-600 hover:bg-gray-300 dark:hover:bg-teal-900 py-5 ${
                  i % 2 === 0 && "bg-slate-100 dark:bg-slate-800"
                }`}
              >
                <td className={`py-2 px-2`}>{i + 1}</td>
                <td className={`py-2 px-1`}>{dep.Dep_name}</td>
               
                <td className={`py-2 px-1`}>
                  {/* //*Edit button */}
                  <button
                    className={`w-8 h-6 p-1 bg-blue-500 hover:bg-blue-700 text-white rounded  shadow-md transition-colors duration-300 ease-linear  flex justify-center items-center opacity-50`}
                    onClick={() => handleEdit(dep)}
                    disabled
                  >
                    <FilePenLineIcon className={`text-white w-5`} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* {userModalOpen && <UserModal />} */}
    </>
  );
};
