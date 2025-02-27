"use client";

import { useCategories } from "@/hooks/useCategories";
import { useCategoryStore } from "@/store";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Subtitle } from "../ui/Subtitle";
import { LoadingSpinner2 } from "@/components/UI";
import { NewCategoryModal } from "./NewCategoryModal";
import { Category } from "@prisma/client";
import { DeleteCategoryModal } from "./DeleteCategoryModal";

export const CategoryContent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { getCategories } = useCategories();
  const {
    setCategories,
    categories,
    newCategoryModalOpen,
    toggleNewCategoryModal,
    setCategory,
    setDeleteCategoryModal, deleteCategoryModalOpen
  } = useCategoryStore();

  const handleEdit = (category: Category) => {
    setCategory(category);
    toggleNewCategoryModal();
  };

  const handleNew = () => {
    toggleNewCategoryModal();
  };

  useEffect(() => {
    if (categories !== null) return; // No ejecutar si ya hay datos

    let isMounted = true;
    setLoading(true); // Activa el loading antes de la petición

    const getAll = async () => {
      try {
        const { ok, data, message } = await getCategories();

        if (!isMounted) return; // Si el componente se desmontó, no hacer nada

        if (ok && data) {
          setCategories(data);
        } else {
          toast.error(message || "Error al obtener categorías");
        }
      } catch (error) {
        console.error(error);
        if (isMounted) toast.error("Error inesperado al obtener categorías");
      } finally {
        if (isMounted) setLoading(false); // Asegura que loading se desactive solo si sigue montado
      }
    };

    getAll();

    return () => {
      isMounted = false;
    };
  }, [setCategories, categories, getCategories]); // Se ejecuta solo al montar el componente

  return loading ? (
    <div>
      <LoadingSpinner2 />
    </div>
  ) : (
    <>
      <div className={`flex gap-2`}>
        {/* <button
         className={`w-36 md:w-40 md:px-0 h-10 flex justify-center items-center gap-1 text-xs shadow-md p-2 border-2 transition-all duration-300 rounded hover:bg-gray-300 hover:dark:bg-slate-900 bg-white dark:bg-transparent  dark:border-slate-300  border-white`}
          // onClick={onNew}
        >
          Ver Categorías
        </button> */}
        <button
          className={`w-36 md:w-40 md:px-0 h-10 flex justify-center items-center gap-1 text-white transition-colors duration-300 text-xs bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600 shadow-md rounded`}
          onClick={handleNew}
        >
          Nueva Categoría
        </button>
      </div>

      {!categories || categories.length < 1 ? (
        <div className={`italic font-medium text-base`}>
          No hay categorías para mostrar
        </div>
      ) : (
        <>
          <Subtitle label="Categorías" />
          <div className="overflow-auto my-5 bg-white p-5 dark:bg-slate-900 shadow-lg rounded">
            <table className="w-full rounded overflow-hidden text-left shadow-md border-collapse">
              <thead className="bg-indigo-900 text-slate-200 border-b-8 border-b-blue-600">
                <tr>
                  <th className="py-3 px-1">Item</th>
                  <th className="py-3 px-1 w-96">Categoría</th>
                  <th className="py-3 px-1">Editar</th>
                  <th className="py-3 px-1">Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, i) => (
                  <tr
                    key={category.Cat_id}
                    className={`hover:bg-gray-300 dark:hover:bg-teal-950 py-5 ${
                      i % 2 === 0 ? "bg-slate-100 dark:bg-slate-800" : ""
                    }`}
                  >
                    <td className="p-1">{i + 1}</td>
                    <td className="p-1">{category.Cat_name}</td>
                    <td className="p-1">
                      <button
                        className="text-white rounded-full bg-blue-800 dark:bg-blue-900 w-7 h-7 p-1 flex items-center justify-center"
                        onClick={() => handleEdit(category)}
                      >
                        <PencilIcon className={`w-4`} />
                      </button>
                    </td>
                    <td className="p-1">
                      <button
                        className="text-white rounded-full bg-rose-600 dark:bg-rose-900 w-7 h-7 p-1 flex items-center justify-center"
                        onClick={() =>
                          setDeleteCategoryModal({
                            isOpen: true,
                            categoryId: category.Cat_id,
                          })
                        }
                      >
                        <TrashIcon className={`w-4`} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {deleteCategoryModalOpen.isOpen && <DeleteCategoryModal />}

      {newCategoryModalOpen && <NewCategoryModal />}
    </>
  );
};
