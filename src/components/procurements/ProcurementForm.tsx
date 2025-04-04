"use client";

import { supplierStore } from "@/store";

import { zodResolver } from "@hookform/resolvers/zod";
// import { Decimal } from "@prisma/client/runtime/library";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { LoadingSpinner } from "../UI/LoadingSpinner";
import { z } from "zod";
import { procurementStore } from "@/store/procurementStore";

import { GetSupplierListButton } from "./supplier/GetSupplierListButton";
import procurementSchema from "@/validations/procurementSchema";
import { toast } from "react-toastify";
import { useProcurement } from "@/hooks/useProcurement";
import { formatDateForInput } from "@/utils";

type FormValuesTypes = z.infer<typeof procurementSchema>;

export const ProcurementForm = () => {
  const {
    procurement,
    updateProcurements,
    toggleCurrentView,
    clearProcurement,
  } = procurementStore();
  const { supplierList } = supplierStore();
  const [loading, setLoading] = useState<boolean>(false);
  const { createProcurement, updateProcurement } = useProcurement();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValuesTypes>({
    resolver: zodResolver(procurementSchema),
    //defaultValues: purchase || {},
  });

  const onSubmit: SubmitHandler<FormValuesTypes> = async (data) => {
    setLoading(true);
    if (procurement) {
      try {
        const {
          ok,
          data: updatedProc,
          message,
        } = await updateProcurement(procurement.Proc_id, data);
        if (ok && updatedProc) {
          updateProcurements("update", updatedProc);
          toggleCurrentView("list");
          clearProcurement();
        } else {
          toast.error(message);
        }
      } catch (error) {
        toast.error("Error al actualizar la compra");
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const { ok, data: newProc, message } = await createProcurement(data);
        if (ok && newProc) {
          updateProcurements("add", newProc);
          toggleCurrentView("list");
        } else {
          toast.error(message);
        }
      } catch (error) {
        toast.error("Error al crear la compra");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    reset();
  };

  return (
    <>
      <div className="overflow-auto my-5 bg-white p-5 dark:bg-slate-900 rounded max-w-[800px] mx-auto">
        <h2 className="text-base font-semibold text-center bg-indigo-900 text-slate-200 border-b-8 border-b-blue-600 dark:border-b-blue-800 py-2">
          {procurement ? "Editar Compra" : "Crear Nueva Orden de Compra"}
        </h2>

        <form
          className="w-full max-w-[600px] mx-auto py-2 space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="flex flex-col">
            Descripción
            {errors.Proc_desc && (
              <div className="text-xs text-red-600 my-0 font-medium">
                {errors.Proc_desc.message}
              </div>
            )}
            <textarea
              className="bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded resize-none h-20"
              {...register("Proc_desc")}
              defaultValue={procurement ? procurement.Proc_desc : ""}
            />
          </label>

          <div className={`flex flex-col`}>
            <label className="flex flex-col">Proveedor</label>
            {errors.Proc_suppId && (
              <div className="text-xs text-red-600 my-0 font-medium">
                {errors.Proc_suppId.message}
              </div>
            )}
            <div className={`flex gap-1`}>
              <GetSupplierListButton />
              <select
                className="bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded flex-1"
                {...register("Proc_suppId", { valueAsNumber: true })}
                defaultValue={procurement ? procurement.Proc_suppId : ""}
              >
                <option value={`${procurement ? procurement.Proc_suppId : ""}`}>
                  {procurement
                    ? procurement.Supplier.Supp_name
                    : "-- Seleccione --"}
                </option>
                {supplierList?.map((supplier, i) => (
                  <option key={i} value={supplier.Supp_id}>
                    {supplier.Supp_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <label className="flex flex-col">
            Método de Pago
            {errors.Proc_paymentMethod && (
              <div className="text-xs text-red-600 my-0 font-medium">
                {errors.Proc_paymentMethod.message}
              </div>
            )}
            <input
              type="text"
              className="bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded"
              {...register("Proc_paymentMethod")}
              defaultValue={procurement ? procurement.Proc_paymentMethod : ""}
            />
          </label>

          <label className="flex flex-col">
            Término de Pago
            {errors.Proc_dueDate && (
              <div className="text-xs text-red-600 my-0 font-medium">
                {errors.Proc_dueDate.message}
              </div>
            )}
            <input
              type="date"
              className="bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded"
              {...register("Proc_dueDate", { valueAsDate: true })}
              defaultValue={
                procurement ? formatDateForInput(procurement.Proc_dueDate) : ""
              }
            />
          </label>

          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="bg-indigo-700 hover:bg-blue-600 text-slate-200 font-semibold text-base p-2 focus:outline-none rounded cursor-pointer w-full mt-4 max-w-72 h-10 transition-colors flex items-center justify-center"
            >
              {loading ? (
                <LoadingSpinner />
              ) : (
                <>{procurement ? "Editar" : "Crear"}</>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
