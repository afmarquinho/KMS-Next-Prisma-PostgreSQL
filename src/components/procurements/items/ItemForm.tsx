"use client";

import { useCategoryStore } from "@/store/categoryStore";
import { useItemStore } from "@/store/ItemStore";
import itemSchema from "@/validations/ItemSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SaveIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { GetCategoriesButton } from "./GetCategoriesButton";
import { measurementUnits } from "@/seed/data";
import { useItem } from "@/hooks/useItem";
import { useProcurementStore } from "@/store/procurementStore";
import { toast } from "react-toastify";
import { LoadingSpinner } from "@/components/UI";
import { formatToCurrency, parseCurrencyToNumber } from "@/utils";

export const ItemForm = () => {
  const { item, toggleItemModal, setItems, clearItem } = useItemStore();
  const { procurementDetails, setProcurementDetails, updateAmount } =
    useProcurementStore();
  const [loading, setLoading] = useState<boolean>(false);
  const { categories } = useCategoryStore();
  const { createItem, updateItem } = useItem();

  type FormValuesType = z.infer<typeof itemSchema>;

  // TODO: HACER QUE SE ACTUALICE LA TABLA PRINCEPAL AL EIDTAR O CRAR ITEN (CON LOS MONTOS NUEVOS), LO PUEDE HACER CREANDO UN NUEVO STORE

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValuesType>({
    resolver: zodResolver(itemSchema),
  });

  const handleCancel = () => {
    clearItem();
    toggleItemModal();
  };

  const onSubmit: SubmitHandler<FormValuesType> = async (data) => {
    if (!procurementDetails) return;

    setLoading(true);
    if (item) {
      try {
        const {
          ok,
          data: upData,
          message,
        } = await updateItem(procurementDetails.Pro_id, item.Item_id, data);
        if (ok && upData) {
          const { Item, ...procurement } = upData;
          setProcurementDetails(procurement);
          setItems(Item);
          updateAmount(procurementDetails.Pro_id, procurement.Pro_totalAmount);
          toggleItemModal();

          toast.success("Producto actualizado.");
          reset();
        } else {
          toast.error(message);
        }
      } catch (error) {
        toast.error("Hubo un problema al procesar la solicitud");
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const {
          ok,
          data: newItem,
          message,
        } = await createItem(procurementDetails.Pro_id, data);
        if (ok && newItem) {
          const { Item, ...procurement } = newItem;
          setProcurementDetails(procurement);
          setItems(Item);
          updateAmount(procurementDetails.Pro_id, procurement.Pro_totalAmount);
          toggleItemModal();
          reset();
          toast.success("Producto creado exitosamente.");
        } else {
          toast.error(message);
        }
      } catch (error) {
        toast.error("Hubo un problema al procesar la solicitud");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-80 z-20 flex justify-center items-center backdrop-blur-[1px]`}
      >
        <div className="overflow-auto my-5 bg-white p-5 dark:bg-slate-900 rounded  w-11/12 max-w-[800px] mx-auto">
          <h2
            className={`text-base font-semibold text-center bg-indigo-900 text-slate-200 border-b-8 border-b-blue-600 dark:border-b-blue-800 py-2`}
          >
            {item ? "Editar Ítem" : "Crear Ítem"}
          </h2>

          <form
            className={`w-full max-w-[600px] mx-auto py-2 space-y-4`}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={`flex flex-col md:flex-row w-full gap-4`}>
              {/* //*NOMBRE */}
              <label className={`flex flex-col w-full md:w-1/2`}>
                Nombre
                {errors.Item_name && (
                  <div className={`text-xs text-red-600 my-0 font-medium`}>
                    {errors.Item_name.message}
                  </div>
                )}
                <input
                  type="text"
                  className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded`}
                  {...register("Item_name")}
                  defaultValue={item ? item.Item_name : ""}
                  readOnly={loading}
                  autoFocus={item === null}
                />
              </label>
              {/* //*FIN NOMBRE */}

              {/* //*REFERENCIA */}
              <label className={`flex flex-col w-full md:w-1/2`}>
                Referencia
                <input
                  type="text"
                  className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded uppercase ${
                    item ? "text-gray-600" : ""
                  }`}
                  {...register("Item_ref")}
                  defaultValue={item && item.Item_ref ? item.Item_ref : ""}
                  readOnly={loading || item !== null}
                />
              </label>
              {/* //*FIN REFERENCIA */}
            </div>

            {/* //* DESCRIPCIÓN*/}
            <label className={`flex flex-col w-full`}>
              Descripción
              {errors.Item_desc && (
                <div className={`text-xs text-red-600 my-0 font-medium`}>
                  {errors.Item_desc.message}
                </div>
              )}
              <textarea
                className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded resize-none`}
                {...register("Item_desc")}
                defaultValue={item ? item.Item_desc : ""}
                readOnly={loading}
                autoFocus={item === null}
              />
            </label>
            {/* //* FIN DESCRIPCIÓN*/}

            {/* //* CATEGORÍA*/}
            <label className={`flex flex-col w-full`}>
              Categoría
              {errors.Item_catId && (
                <div className={`text-xs text-red-600 my-0 font-medium`}>
                  {errors.Item_catId.message}
                </div>
              )}
              <div className={`flex gap-2 md:gap-3`}>
                <GetCategoriesButton />
                <select
                  className="bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded flex-1"
                  {...register("Item_catId", { valueAsNumber: true })}
                  disabled={loading}
                >
                  <option value={`${item ? item.Item_id : ""}`}>
                    {item ? item.Category.Cat_name : "-- Seleccione --"}
                  </option>
                  {categories?.map((category) => (
                    <option key={category.Cat_id} value={category.Cat_id}>
                      {category.Cat_name}
                    </option>
                  ))}
                </select>
              </div>
            </label>
            {/* //* FIN CATEGORÍA*/}

            <div className={`flex flex-col md:flex-row w-full gap-4`}>
              {/* //*COSTO UNITARIO */}
              <label className={`flex flex-col w-full md:w-1/2`}>
                Costo Unitario
                {errors.Item_unitCost && (
                  <div className={`text-xs text-red-600 my-0 font-medium`}>
                    {errors.Item_unitCost.message}
                  </div>
                )}
                <input
                  type="number"
                  step="0.01"
                  className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded`}
                  {...register("Item_unitCost", { valueAsNumber: true })}
                  defaultValue={
                    item
                      ? parseCurrencyToNumber(
                          formatToCurrency(item.Item_unitCost)
                        )
                      : ""
                  }
                  readOnly={loading}
                  autoFocus={item === null}
                />
              </label>
              {/* //*COSTO UNITARIO */}

              {/* //* CANTIDAD */}
              <label className={`flex flex-col w-full md:w-1/2`}>
                Cantidad
                {errors.Item_qtyOrdered && (
                  <div className={`text-xs text-red-600 my-0 font-medium`}>
                    {errors.Item_qtyOrdered.message}
                  </div>
                )}
                <input
                  type="number"
                  className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded`}
                  {...register("Item_qtyOrdered", { valueAsNumber: true })}
                  defaultValue={item ? item.Item_qtyOrdered : ""}
                  readOnly={loading}
                />
              </label>
              {/* //* FIN CANTIDAD */}
            </div>

            {/* //* UNIDAES DE MEDIDA*/}
            <label className={`flex w-full flex-col`}>
              Unidad de medida
              {errors.Item_unitMeasure && (
                <div className={`text-xs text-red-600 my-0 font-medium`}>
                  {errors.Item_unitMeasure.message}
                </div>
              )}
              <select
                className="bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded"
                {...register("Item_unitMeasure")}
                disabled={loading}
              >
                <option value={`${item ? item.Item_unitMeasure : ""}`}>
                  {item ? item.Item_unitMeasure : "-- Seleccione --"}
                </option>
                {measurementUnits.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </label>
            {/* //* FIN UNIDAES DE MEDIDA*/}

            <div
              className={`flex items-center justify-between md:justify-evenly`}
            >
              <button
                type="button"
                className={`flex items-center justify-center  gap-1 text-white bg-rose-600 dark:bg-rose-700 hover:bg-rose-700 dark:hover:bg-rose-600 rounded transition-colors duration-300 w-44 h-9 md:h-10`}
                onClick={handleCancel}
                disabled={loading}
              >
                <XIcon className={`w-5`} /> Cancelar
              </button>

              <button
                type="submit"
                className={`flex items-center justify-center  gap-1 text-white bg-indigo-900 dark:bg-indigo-700 hover:bg-indigo-700 dark:hover:bg-indigo-600 rounded transition-colors duration-300 w-44 h-9 md:h-10`}
                disabled={loading}
              >
                {loading ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    <SaveIcon className={`w-5`} /> {item ? "Editar" : "Guardar"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
