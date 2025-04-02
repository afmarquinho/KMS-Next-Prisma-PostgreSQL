"use client";

import { GetCategoryListButton } from "@/components/procurements";
import { LoadingSpinner } from "@/components/UI";
import { useReferences } from "@/hooks";
import { measurementUnits } from "@/seed/data";
import { useCategoryStore, useReferenceStore } from "@/store";
import { productSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

type FormValuesType = z.infer<typeof productSchema>;

export const ReferenceForm = () => {
  const { categories } = useCategoryStore();
  const [loading, setLoading] = useState<boolean>(false);
  const { createNewReference } = useReferences();
  const { updateReferenceList } = useReferenceStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValuesType>({ resolver: zodResolver(productSchema) });

  const onSubmit: SubmitHandler<FormValuesType> = async (data) => {
    setLoading(true);
    try {
      const { ok, message, data: newRef } = await createNewReference(data);
      if (ok && newRef) {
        updateReferenceList("update", newRef);
        toast.success(message);
        reset();
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Errror al cargar las referencias");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-auto my-5 bg-white p-5 dark:bg-slate-900 rounded max-w-[800px] mx-auto">
      <h2 className="text-base font-semibold text-center bg-indigo-900 text-slate-200 border-b-8 border-b-blue-600 dark:border-b-blue-800 py-2">
        {"Crear Referencia"}
      </h2>
      <form
        className="w-full max-w-[600px] mx-auto py-2 space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="flex flex-col">
          Referencia
          {errors.Prod_ref && (
            <div className="text-xs text-red-600">
              {errors.Prod_ref.message}
            </div>
          )}
          <input
            type="text"
            className="bg-slate-300 dark:bg-slate-700 p-1 focus:outline-none text-base rounded resize-none uppercase"
            {...register("Prod_ref")}
          />
        </label>

        <label className="flex flex-col">
          Nombre
          {errors.Prod_name && (
            <div className="text-xs text-red-600">
              {errors.Prod_name.message}
            </div>
          )}
          <input
            type="text"
            className="bg-slate-300 dark:bg-slate-700 p-1 outline-none text-base rounded resize-none"
            {...register("Prod_name")}
          />
        </label>

        <label className="flex flex-col">
          Descripción
          {errors.Prod_desc && (
            <div className="text-xs text-red-600">
              {errors.Prod_desc.message}
            </div>
          )}
          <textarea
            className="bg-slate-300 dark:bg-slate-700 p-1 outline-none text-base rounded resize-none h-12"
            {...register("Prod_desc")}
          />
        </label>

        <div className="flex flex-col">
          <label>Categoría</label>
          {errors.Prod_catId && (
            <div className="text-xs text-red-600">
              {errors.Prod_catId.message}
            </div>
          )}
          <div className="flex gap-2">
            <GetCategoryListButton />
            <select
              className="bg-slate-300 dark:bg-slate-700 p-1 outline-none text-base rounded w-full"
              {...register("Prod_catId", { valueAsNumber: true })}
            >
              <option value="">-- Seleccione</option>
              {categories?.map((c) => (
                <option key={c.Cat_id} value={c.Cat_id}>
                  {c.Cat_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row space-y-4 md:space-x-2 md:space-y-0 w-full">
          <label className="flex flex-col w-full">
            <span>
              Marca <span className="text-red-500 text-xs">(opcional)</span>
            </span>
            <input
              type="text"
              className="bg-slate-300 dark:bg-slate-700 p-1 outline-none text-base rounded resize-none"
              {...register("Prod_brand")}
            />
          </label>

          <label className="flex flex-col w-full">
            Unidad de medida
            {errors.Prod_unitMeasure && (
              <div className="text-xs text-red-600">
                {errors.Prod_unitMeasure.message}
              </div>
            )}
            <select
              className="bg-slate-300 dark:bg-slate-700 p-1 outline-none text-base rounded"
              {...register("Prod_unitMeasure")}
            >
              <option value="">-- Seleccione</option>
              {measurementUnits.map((u, i) => (
                <option key={i} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="w-full flex justify-center">
          <button
            type="submit"
            className="bg-indigo-700 hover:bg-blue-600 text-slate-200 font-semibold text-base p-1 focus:outline-none rounded cursor-pointer w-full mt-4 max-w-72 h-10 transition-colors flex items-center justify-center"
          >
            {loading ? <LoadingSpinner /> : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
};
