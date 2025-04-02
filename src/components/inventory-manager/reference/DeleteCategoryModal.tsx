"use client";

import { LoadingSpinner } from "@/components/UI";
import { useCategories } from "@/hooks/useCategories";
import { useCategoryStore } from "@/store";
import { TriangleAlertIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export const DeleteCategoryModal = () => {
  const { updateCategories, setDeleteCategoryModal, deleteCategoryModalOpen } =
    useCategoryStore();
  const { deleteCategory } = useCategories();

  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setLoading(true);
    if (!deleteCategoryModalOpen.categoryId) return;

    try {
      const { ok, data, message } = await deleteCategory(
        deleteCategoryModalOpen.categoryId
      );

      if (ok && data) {
        updateCategories("delete", data);
        toast.success(message);
        setDeleteCategoryModal({
          isOpen: false,
          categoryId: null,
        });
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Hubo un problema al procesar la solicitud");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-80 z-20 flex justify-center items-center backdrop-blur-[1px]">
      <div className="w-full max-w-96 bg-white dark:bg-slate-700">
        <div className="relative">
          <TriangleAlertIcon
            className="absolute top-2 left-2 text-yellow-400"
            strokeWidth={3}
          />
          <button
            className="absolute top-2 right-2 bg-red-800 hover:bg-red-950"
            onClick={() =>
              setDeleteCategoryModal({
                isOpen: false,
                categoryId: null,
              })
            }
          >
            <XIcon className="text-yellow-400 cursor-pointer" strokeWidth={3} />
          </button>
          <h2 className="bg-gradient-to-b text-center text-white uppercase font-bold py-3 from-red-600 to-red-700 dark:from-red-800 dark:to-red-900">
            Alerta
          </h2>
        </div>
        <div className="p-4">
          <p className="text-center">
            ¿Realmente deseas eliminar esta categoría?
          </p>

          <button
            className={`flex gap-1 justify-center items-center  rounded text-white transition-all mx-auto mt-5 uppercase font-semibold shadow-md bg-rose-700 hover:bg-rose-600 w-28 md:w-32 h-8 md:h-10`}
            onClick={handleDelete}
          >
            {loading ? <LoadingSpinner /> : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
};
