"use client";

import { useCustomers } from "@/hooks";
import { useCustomerStore } from "@/store";
import customerSchema from "@/validations/customerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { LoadingSpinner } from "../UI";

type FormValuesType = z.infer<typeof customerSchema>;

export const CustomerForm = () => {
  const { customer, updateCustomers, clearCustomer } = useCustomerStore();
  const {createCustomer, updateCustomer} = useCustomers()
  
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValuesType>({
    resolver: zodResolver(customerSchema),
  });

  const onSubmit: SubmitHandler<FormValuesType> = async (data) => { setLoading(true); // Inicia el estado de carga

  if (customer) {
    //? Se edita el cliente existente

  
     try {
       const {
         ok,
         data: updatedCustomer,
         message,
       } = await updateCustomer(data, customer.Customer_id);
       if (ok && updatedCustomer) {
         updateCustomers("update", updatedCustomer);  //Actualiza el usuario en el estado
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
       clearCustomer(); 
     }
  } else {
    //? Se crea un nuevo cliente
    try {
      
      const { ok, data: newCustomer, message } = await createCustomer(data); //* Renombro la data como newCustomer message para no generar conflicto con data del hookForm
      if (ok && newCustomer) {
        updateCustomers("add", newCustomer); // Agregar usuario
        toast.success("Cliente creado con éxito"); // Notificación de éxito
        reset(); //* Resetear el formulario
      } else {
        toast.error(message); // Notificación de error
      }
    } catch (error) {
      toast.error("Hubo un problema al procesar la solicitud");
      console.error(error);
    } finally {
      setLoading(false); // Finaliza el estado de carga
      clearCustomer(); //* Limpiar cualquier estado
    }
  }
};

  return (
    <>
      <div className="overflow-auto my-5 bg-white p-5 dark:bg-slate-900 rounded max-w-[800px] mx-auto">
        <h2
          className={`text-base font-semibold text-center bg-indigo-900 text-slate-200 border-b-8 border-b-blue-600 dark:border-b-blue-800 py-2`}
        >
          {customer ? "Editar Cliente" : "Crear Cliente"}
        </h2>

        <form
          className={`w-full max-w-[600px] mx-auto py-2 space-y-4`}
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* //*DNI AND NAME*/}
          <div className={`flex flex-col md:flex-row w-full gap-4`}>
            <div className={`flex flex-col w-full md:w-1/2`}>
              <label>Cédula</label>
              {errors.Customer_dni && (
                <div
                  className={`text-xs text-red-600 my-0 font-medium ${
                    customer === null ? "" : "text-gray-500"
                  }`}
                >
                  {errors.Customer_dni.message}
                </div>
              )}

              <input
                type="number"
                className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md ${
                  customer === null ? "" : "text-gray-500"
                }`}
                {...register("Customer_dni", { valueAsNumber: true })}
                defaultValue={customer ? customer.Customer_dni : ""}
                readOnly={customer !== null}
              />
            </div>
            <div className={`flex flex-col w-full md:w-1/2`}>
              <label>Nombre</label>
              {errors.Customer_name && (
                <div className={`text-xs text-red-600 my-0 font-medium`}>
                  {errors.Customer_name.message}
                </div>
              )}
              <input
                type="text"
                className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md ${
                  customer === null ? "" : "text-gray-500"
                }`}
                {...register("Customer_name")}
                defaultValue={customer ? customer.Customer_name : ""}
                readOnly={customer !== null}
              />
            </div>
          </div>

          {/* //* SURNAME AND EMAIL */}
          <div className={`flex flex-col md:flex-row w-full gap-4`}>
            <div className={`flex flex-col w-full md:w-1/2`}>
              <label>Apellido</label>
              {errors.Customer_surname && (
                <div className={`text-xs text-red-600 my-0 font-medium`}>
                  {errors.Customer_surname.message}
                </div>
              )}
              <input
                type="text"
                className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md ${
                  customer === null ? "" : "text-gray-500"
                }`}
                {...register("Customer_surname")}
                defaultValue={customer ? customer.Customer_surname : ""}
                readOnly={customer !== null}
              />
            </div>
            <div className={`flex flex-col w-full md:w-1/2`}>
              <label>Correo Electrónico</label>
              {errors.Customer_email && (
                <div className={`text-xs text-red-600 my-0 font-medium`}>
                  {errors.Customer_email.message}
                </div>
              )}
              <input
                type="text"
                className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md`}
                {...register("Customer_email")}
                defaultValue={customer ? customer.Customer_email : ""}
              />
            </div>
          </div>

          {/* //* PHONENUMBER AND ADDRESS */}
          <div className={`flex flex-col md:flex-row w-full gap-4`}>
            <div className={`flex flex-col w-full md:w-1/2`}>
              <label>Teléfono</label>
              {errors.Customer_phoneNumber && (
                <div className={`text-xs text-red-600 my-0 font-medium`}>
                  {errors.Customer_phoneNumber.message}
                </div>
              )}
              <input
                type="text"
                className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md`}
                {...register("Customer_phoneNumber")}
                defaultValue={customer ? customer.Customer_phoneNumber : ""}
              />
            </div>
            <div className={`flex flex-col w-full md:w-1/2`}>
              <label>Dirección</label>
              {errors.Customer_address && (
                <div className={`text-xs text-red-600 my-0 font-medium`}>
                  {errors.Customer_address.message}
                </div>
              )}
              <input
                type="text"
                className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md`}
                {...register("Customer_address")}
                defaultValue={customer ? customer.Customer_address : ""}
              />
            </div>
          </div>

          {/* //* HABEAS DATA*/}
          <div className={`flex flex-col w-full gap-4`}>
            {errors.Customer_habeasData && (
              <div className={`text-xs text-red-600 my-0 font-medium`}>
                {errors.Customer_habeasData.message}
              </div>
            )}

            <label className={`w-full flex justify-start items-start gap-5`}>
              <input
                type="checkbox"
                {...register("Customer_habeasData")}
                defaultChecked={customer?.Customer_habeasData}
              />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              laborum laudantium repellat dignissimos ex ipsum cum perspiciatis
              voluptates, beatae quibusdam recusandae, omnis totam sunt quas?
              Explicabo omnis, voluptatem repellat amet iste dicta eum mollitia?
              Earum repellendus officiis accusantium, laudantium eos corporis
              vero alias, rerum ab cupiditate maxime. Nisi, deserunt numquam?
            </label>
          </div>

           <div className={`w-full flex justify-center`}>
                     <button
                       type="submit"
                       className={`bg-indigo-900 hover:bg-indigo-700 text-slate-200 font-semibold text-base p-2 focus:outline-none rounded-md cursor-pointer w-full mt-4 max-w-96 transition-colors flex justify-center items-center`}
                       disabled={loading}
                     >
                       {loading ? <LoadingSpinner /> : customer ? "Editar" : "Crear"}
                     </button>
                   </div>
        </form>
      </div>
    </>
  );
};
