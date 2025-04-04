"use client";

import { LoadingSpinner } from "@/components/UI";
import { useCategories } from "@/hooks/useCategories";
import { categoryStore } from "@/store";
import categorySchema from "@/validations/categorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SaveIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

type FormValuesType = z.infer<typeof categorySchema>;

export const NewCategoryModal = () => {
  const { category, clearCategory, toggleNewCategoryModal, updateCategories } =
    categoryStore();
  const { createCategory, updateCategory } = useCategories();

  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValuesType>({
    resolver: zodResolver(categorySchema),
  });

  const handleCancel = () => {
    toggleNewCategoryModal();
    clearCategory();
  };

  const onSubmit: SubmitHandler<FormValuesType> = async (data) => {
    setLoading(true);
    if (!category) {
      try {
        const { ok, data: newCat, message } = await createCategory(data);
        if (ok && newCat) {
          updateCategories("add", newCat);
          toast.success(message);
          reset();
          toggleNewCategoryModal();
        } else {
          toast.error(message);
        }
      } catch (error) {
        toast.error("Hubo un problema al procesar la solicitud");
        console.error(error);
      } finally {
        setLoading(false);
        clearCategory();
      }
    } else {
      try {
        const { ok, data: updatedCat, message } = await updateCategory(category.Cat_id, data);
        if (ok && updatedCat) {
          updateCategories("update", updatedCat);
          toast.success(message);
          reset();
          toggleNewCategoryModal();
        } else {
          toast.error(message);
        }
      } catch (error) {
        toast.error("Hubo un problema al procesar la solicitud");
        console.error(error);
      } finally {
        setLoading(false);
        clearCategory();
      }
    }
  };
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-60 z-20 flex justify-center items-center backdrop-blur-[1px]`}
    >
      <div className={`bg-white dark:bg-slate-800 p-10 w-11/12 max-w-[800px]`}>
        <h2
          className={`text-base font-semibold text-center bg-indigo-900 text-slate-200 border-b-8 border-b-blue-600 dark:border-b-blue-800 py-2`}
        >
          {category ? "Editar Categoría" : "Crear Nueva Categoría"}
        </h2>
        <form
          action=""
          className={`w-full max-w-[600px] mx-auto py-2 space-y-4`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="flex flex-col">
            Nombre
            {errors.Cat_name && (
              <div className={`text-xs text-red-600 my-0 font-medium`}>
                {errors.Cat_name.message}
              </div>
            )}
            <input
              type="text"
              className="bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md"
              defaultValue={category ? category.Cat_name : ""}
              {...register("Cat_name")}
              autoFocus
            />
          </label>
          <div
            className={`flex items-center justify-between md:justify-evenly`}
          >
            <button
              type="button"
              className={`flex items-center justify-center  gap-1 text-white bg-rose-600 dark:bg-rose-700 hover:bg-rose-700 dark:hover:bg-rose-600 rounded transition-colors duration-300 w-44 h-9 md:h-10`}
              onClick={handleCancel}
            >
              <XIcon className={`w-5`} /> Cancelar
            </button>
            <button
              type="submit"
              className={`flex items-center justify-center  gap-1 text-white bg-indigo-900 dark:bg-indigo-700 hover:bg-indigo-700 dark:hover:bg-indigo-600 rounded transition-colors duration-300 w-44 h-9 md:h-10`}
              disabled={false}
            >
              {loading ? (
                <LoadingSpinner />
              ) : (
                <>
                  {" "}
                  <SaveIcon className={`w-5`} />
                  {category ? "Editar" : "Crear"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
