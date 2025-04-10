"use client";

import { LoadingSpinner } from "@/components/UI";
import { useDepartment } from "@/hooks/useDepartments";
import { departmentStore } from "@/store";
import { SaveIcon } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

export const DepartmentForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { createDepartment } = useDepartment();
  const [department, setDepartment] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { updateDeparments } = departmentStore();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (department.trim() === "" || department.trim().length < 2) {
      setError("El nombre del departamento no puede estar vacío.");
      return;
    }

    setLoading(true);
    setError("");
    const capitalized =
      department.trim().charAt(0).toUpperCase() +
      department.trim().slice(1).toLowerCase();
    try {
      const { ok, data, message } = await createDepartment(capitalized);

      if (ok && data) {
        setDepartment("");
        updateDeparments("add", data);
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-10 w-11/12 max-w-[800px] mx-auto">
      <h2 className="text-base font-semibold text-center bg-indigo-900 text-slate-200 border-b-8 border-b-blue-600 dark:border-b-blue-800 py-2">
        Crear Nuevo Departamento
      </h2>
      <form
        className="w-full max-w-[600px] mx-auto py-2 space-y-4"
        onSubmit={handleSubmit}
      >
        <label className="flex flex-col">
          Departamento
          {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
          <input
            type="text"
            className="bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md"
            autoFocus
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className="flex items-center justify-center gap-1 text-white bg-indigo-900 dark:bg-indigo-700 hover:bg-indigo-700 dark:hover:bg-indigo-600 rounded transition-colors duration-300 w-44 h-9 md:h-10 disabled:opacity-60 mx-auto"
          disabled={loading || department.trim() === ""}
        >
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <SaveIcon className="w-5" />
              Crear
            </>
          )}
        </button>
      </form>
    </div>
  );
};
