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
       } = await updateCustomer(data, customer.Cust_id);
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
              {errors.Cust_dni && (
                <div
                  className={`text-xs text-red-600 my-0 font-medium ${
                    customer === null ? "" : "text-gray-500"
                  }`}
                >
                  {errors.Cust_dni.message}
                </div>
              )}

              <input
                type="number"
                className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md ${
                  customer === null ? "" : "text-gray-500"
                }`}
                {...register("Cust_dni", { valueAsNumber: true })}
                defaultValue={customer ? customer.Cust_dni : ""}
                readOnly={customer !== null}
              />
            </div>
            <div className={`flex flex-col w-full md:w-1/2`}>
              <label>Nombre</label>
              {errors.Cust_name && (
                <div className={`text-xs text-red-600 my-0 font-medium`}>
                  {errors.Cust_name.message}
                </div>
              )}
              <input
                type="text"
                className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md ${
                  customer === null ? "" : "text-gray-500"
                }`}
                {...register("Cust_name")}
                defaultValue={customer ? customer.Cust_name : ""}
                readOnly={customer !== null}
              />
            </div>
          </div>

          {/* //* SURNAME AND EMAIL */}
          <div className={`flex flex-col md:flex-row w-full gap-4`}>
            <div className={`flex flex-col w-full md:w-1/2`}>
              <label>Apellido</label>
              {errors.Cust_surname && (
                <div className={`text-xs text-red-600 my-0 font-medium`}>
                  {errors.Cust_surname.message}
                </div>
              )}
              <input
                type="text"
                className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md ${
                  customer === null ? "" : "text-gray-500"
                }`}
                {...register("Cust_surname")}
                defaultValue={customer ? customer.Cust_surname : ""}
                readOnly={customer !== null}
              />
            </div>
            <div className={`flex flex-col w-full md:w-1/2`}>
              <label>Correo Electrónico</label>
              {errors.Cust_email && (
                <div className={`text-xs text-red-600 my-0 font-medium`}>
                  {errors.Cust_email.message}
                </div>
              )}
              <input
                type="text"
                className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md`}
                {...register("Cust_email")}
                defaultValue={customer ? customer.Cust_email : ""}
              />
            </div>
          </div>

          {/* //* PHONENUMBER AND ADDRESS */}
          <div className={`flex flex-col md:flex-row w-full gap-4`}>
            <div className={`flex flex-col w-full md:w-1/2`}>
              <label>Teléfono</label>
              {errors.Cust_phoneNumber && (
                <div className={`text-xs text-red-600 my-0 font-medium`}>
                  {errors.Cust_phoneNumber.message}
                </div>
              )}
              <input
                type="text"
                className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md`}
                {...register("Cust_phoneNumber")}
                defaultValue={customer ? customer.Cust_phoneNumber : ""}
              />
            </div>
            <div className={`flex flex-col w-full md:w-1/2`}>
              <label>Dirección</label>
              {errors.Cust_address && (
                <div className={`text-xs text-red-600 my-0 font-medium`}>
                  {errors.Cust_address.message}
                </div>
              )}
              <input
                type="text"
                className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md`}
                {...register("Cust_address")}
                defaultValue={customer ? customer.Cust_address : ""}
              />
            </div>
          </div>

          {/* //* HABEAS DATA*/}
          <div className={`flex flex-col w-full gap-4`}>
            {errors.Cust_habeasData && (
              <div className={`text-xs text-red-600 my-0 font-medium`}>
                {errors.Cust_habeasData.message}
              </div>
            )}

            <label className={`w-full flex justify-start items-start gap-5`}>
              <input
                type="checkbox"
                {...register("Cust_habeasData")}
                defaultChecked={customer?.Cust_habeasData}
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
