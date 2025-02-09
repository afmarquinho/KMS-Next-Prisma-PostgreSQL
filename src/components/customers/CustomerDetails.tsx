"use client";
import { useCustomerStore } from "@/store";
import { BackButtonCustomer } from "./BackButtonCustomer";
import { ShoppingCartIcon } from "lucide-react";
import { LoadingSpinner2 } from "../UI";

export const CustomerDetails = () => {
  const { customerDetails, loadingDetails } = useCustomerStore();

  if (loadingDetails) {
    return <div className={`flex items justify-center md:h-[450px]`}><LoadingSpinner2/></div>;
  }

  if (!customerDetails) {
    return (
      <>
        <div className={`flex justify-end`}>
          <BackButtonCustomer />
        </div>

        <div className={`text-base italic font-semibold`}>
          No has seleccionado un cliente para visualizar.
        </div>
      </>
    );
  }

  return (
    <>
      <div className={`flex justify-end`}>
        <BackButtonCustomer />
      </div>
      <div className={`space-y-5`}>
        <div
          className={`bg-white dark:bg-slate-900 rounded-lg flex-1 shadow-lg p-5`}
        >
          <h2 className={`font-bold text-center text-base uppercase`}>
            Información Personal
          </h2>
          <table border={1}>
            <tbody className={`text-left`}>
              <tr>
                <th className={`italic`}>Cédula</th>
                <td className={`p-3`}>{customerDetails?.Customer_dni}</td>
              </tr>
              <tr>
                <th className={`italic`}>Nombre</th>
                <td className={`p-3`}>{customerDetails?.Customer_name}</td>
              </tr>
              <tr>
                <th className={`italic`}>Apellido</th>
                <td className={`p-3`}>{customerDetails?.Customer_surname}</td>
              </tr>
              <tr>
                <th className={`italic`}>Correo Electrónico</th>
                <td className={`p-3`}>{customerDetails?.Customer_email}</td>
              </tr>
              <tr>
                <th className={`italic`}>Teléfono</th>
                <td className={`p-3`}>
                  {customerDetails?.Customer_phoneNumber}
                </td>
              </tr>
              <tr>
                <th className={`italic`}>Dirección</th>
                <td className={`p-3`}>{customerDetails?.Customer_address}</td>
              </tr>
              <tr>
                <th className={`italic`}>Tratamiento de datos personales</th>
                <td className={`p-3`}>
                  {customerDetails?.Customer_habeasData ? "Sí" : "No"}
                </td>
              </tr>

              <tr>
                <th className={`italic`}>Editado por</th>
                <td className={`p-3`}>{customerDetails?.Customer_userId}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button
          className={`flex gap-1 justify-center items-center  rounded-md px-2 py-1 text-white transition-colors ${
            false
              ? "bg-gray-400"
              : "bg-indigo-600 hover:bg-indigo-800 dark:bg-indigo-800 dark:hover:bg-indigo-600"
          }`}
          // onClick={handleFetchUsers}
          // disabled={loading}
        >
          <ShoppingCartIcon className={`w-5`} />
          Ver Pedidos
        </button>
        <div
          className={`bg-white dark:bg-slate-900 rounded-lg flex-1 shadow-lg p-5`}
        >
          <h2 className={`font-bold text-center text-base uppercase`}>
            Pedidos
          </h2>
        </div>
      </div>
    </>
  );
};
