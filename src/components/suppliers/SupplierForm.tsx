"use client";

import { supplierStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoadingSpinner } from "../UI";

import supplierSchema from "@/validations/supplierSchema";
import { FormValuesSupplierType } from "@/interface";
import { useSuppliers } from "@/hooks/useSuppliers";
import { toast } from "react-toastify";

export const SupplierForm = () => {
  const { supplier, clearSupplier, updateSuppliers } = supplierStore();

  const [loading, setLoading] = useState<boolean>(false);

  const { createSupplier, updateSupplier } = useSuppliers();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValuesSupplierType>({
    resolver: zodResolver(supplierSchema),
  });

  const onSubmit: SubmitHandler<FormValuesSupplierType> = async (data) => {
    setLoading(true);
    if (supplier) {
      //* Actualizar proveedor

      try {
        const {
          ok,
          data: updatedSupplier,
          message,
        } = await updateSupplier(supplier.Supp_id, data);
        if (ok && updatedSupplier) {
          updateSuppliers("update", updatedSupplier); //Actualiza el usuario en el estado
          toast.success("Usuario actualizado.");
          reset();
        } else {
          toast.error(message);
        }
      } catch (error) {
        toast.error("Hubo un problema al procesar la solicitud");
        console.error(error);
      } finally {
        setLoading(false);
        clearSupplier();
  
      }
    } else {
      //* Crear

      try {
      
        const { ok, data: newSupplier, message } = await createSupplier(data); //* Renombro la data para no generar conflicto con data del hookForm
        if (ok && newSupplier) {
          updateSuppliers("add", newSupplier); // Agregar usuario
          toast.success("Proveedor creado con éxito");
          reset(); //* Resetear el formulario
        } else {
          toast.error(message); // Notificación de error
        }
      } catch (error) {
        toast.error("Hubo un problema al procesar la solicitud");
        console.error(error);
      } finally {
        setLoading(false); // Finaliza el estado de carga
        clearSupplier(); //* Limpiar cualquier estado
      }
    }
  };

  return (
    <>
      <div className="overflow-auto my-5 bg-white p-5 dark:bg-slate-900 rounded max-w-[800px] mx-auto">
        <h2
          className={`text-base font-semibold text-center bg-indigo-900 text-slate-200 border-b-8 border-b-blue-600 dark:border-b-blue-800 py-2`}
        >
          {supplier ? "Editar Proveedor" : "Crear Nuevo Proveedor"}
        </h2>

        <form
          className={`w-full max-w-[600px] mx-auto py-2 space-y-4`}
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* //*NIT AND COMPANY NAME */}
          <div className={`flex flex-col md:flex-row w-full gap-4`}>
            <div className={`flex flex-col w-full md:w-1/2`}>
              <label>Nit</label>
              {errors.Supp_nit && (
                <div
                  className={`text-xs text-red-600 my-0 font-medium ${
                    supplier === null ? "" : "text-gray-500"
                  }`}
                >
                  {errors.Supp_nit.message}
                </div>
              )}

              <input
                type="number"
                className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md ${
                  supplier === null ? "" : "text-gray-500"
                }`}
                {...register("Supp_nit", { valueAsNumber: true })}
                defaultValue={supplier ? supplier.Supp_nit : ""}
                readOnly={supplier !== null}
              />
            </div>
            <div className={`flex flex-col w-full md:w-1/2`}>
              <label>Razón Social</label>
              {errors.Supp_name && (
                <div className={`text-xs text-red-600 my-0 font-medium`}>
                  {errors.Supp_name.message}
                </div>
              )}
              <input
                type="text"
                className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md`}
                {...register("Supp_name")}
                defaultValue={supplier ? supplier.Supp_name : ""}
              />
            </div>
          </div>

          {/* //* CONTACT INFO AND EMAIL */}
          <div className={`flex flex-col md:flex-row w-full gap-4`}>
            <div className={`flex flex-col w-full md:w-1/2`}>
              <label>Nombre de contacto</label>
              {errors.Supp_contactInfo && (
                <div className={`text-xs text-red-600 my-0 font-medium`}>
                  {errors.Supp_contactInfo.message}
                </div>
              )}
              <input
                type="text"
                className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md`}
                {...register("Supp_contactInfo")}
                defaultValue={supplier ? supplier.Supp_contactInfo : ""}
              />
            </div>
            <div className={`flex flex-col w-full md:w-1/2`}>
              <label>Correo Electrónico</label>
              {errors.Supp_email && (
                <div className={`text-xs text-red-600 my-0 font-medium`}>
                  {errors.Supp_email.message}
                </div>
              )}
              <input
                type="text"
                className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md`}
                {...register("Supp_email")}
                defaultValue={supplier ? supplier.Supp_email : ""}
              />
            </div>
          </div>

          {/* //* PHONENUMBER AND CITY */}
          <div className={`flex flex-col md:flex-row w-full gap-4`}>
            <div className={`flex flex-col w-full md:w-1/2`}>
              <label>Teléfono</label>
              {errors.Supp_phoneNumber && (
                <div className={`text-xs text-red-600 my-0 font-medium`}>
                  {errors.Supp_phoneNumber.message}
                </div>
              )}
              <input
                type="text"
                className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md`}
                {...register("Supp_phoneNumber")}
                defaultValue={supplier ? supplier.Supp_phoneNumber : ""}
              />
            </div>
            <div className={`flex flex-col w-full md:w-1/2`}>
              <label>Ciudad</label>
              {errors.Supp_city && (
                <div className={`text-xs text-red-600 my-0 font-medium`}>
                  {errors.Supp_city.message}
                </div>
              )}
              <input
                type="text"
                className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md`}
                {...register("Supp_city")}
                defaultValue={supplier ? supplier.Supp_city : ""}
              />
            </div>
          </div>

          {/* //* ADDRESS */}
          <div className={`flex flex-col md:flex-row w-full gap-4`}>
            <div className={`flex flex-col w-full md:w-1/2`}>
              <label>Dirección</label>
              {errors.Supp_address && (
                <div className={`text-xs text-red-600 my-0 font-medium`}>
                  {errors.Supp_address.message}
                </div>
              )}
              <input
                type="text"
                className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md`}
                {...register("Supp_address")}
                defaultValue={supplier ? supplier.Supp_address : ""}
              />
            </div>
            <div className={`flex flex-col w-full md:w-1/2`}></div>
          </div>

          <div className={`w-ull flex justify-center`}>
            <button
              type="submit"
              className={`bg-indigo-700 hover:bg-indigo-600 text-slate-200 font-semibold text-base p-2 focus:outline-none rounded-md cursor-pointer w-full mt-4 max-w-96 transition-colors flex items-center justify-center`}
            >
              {loading ? (
                <LoadingSpinner />
              ) : (
                <>{supplier ? "Editar" : "Crear"}</>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
