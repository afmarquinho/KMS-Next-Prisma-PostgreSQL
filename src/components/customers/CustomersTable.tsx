"use client";

import { Customer } from "@prisma/client";
import { FilePenLineIcon, SearchIcon } from "lucide-react";
import { useCustomerStore } from "@/store";
import { GetCustomersButton } from "./GetCustomersButton";
import { useCustomers } from "@/hooks";
import { toast } from "react-toastify";

export const CustomersTable = () => {
  const {
    customers,
    setCustomer,
    toggleCurrentView,
    setDetailManager,
    setLoadingdetails,
    setCustomerDetails,
  } = useCustomerStore();

  const { getCustomerById } = useCustomers();

  const handleEdit = (customer: Customer) => {
    setCustomer(customer);
    toggleCurrentView("form");
  };

  const handleView = async (id: number) => {
    try {
      setDetailManager(true);
      setLoadingdetails(true);
      const { ok, data, message } = await getCustomerById(id);
      if (ok && data) {
        setCustomerDetails(data);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error("Hubo un problema al procesar la solicitud");
      console.error(error);
    } finally {
      setLoadingdetails(false);
    }
  };

  if (!customers || customers.length === 0) {
    const message = !customers
      ? 'No hay Clientes para visualizar, presiona el botón "Mostrar Clientes".'
      : "No hay clientes registrados.";

    return (
      <>
        <GetCustomersButton />
        <div className="italic font-medium text-base">{message}</div>
      </>
    );
  }

  return (
    <>
      <GetCustomersButton />
      <div className="overflow-auto my-5 bg-white p-5 dark:bg-slate-900 rounded">
        <table
          className={`w-full rounded border-collapse text-left overflow-hidden shadow-md`}
        >
          <thead
            className={`bg-indigo-900 dark:bg-indigo-900 text-slate-200 border-b-8 border-b-blue-600 dark:border-b-blue-800`}
          >
            <tr>
              <th className={`py-3 px-2`}>Item</th>
              <th className={`py-3 px-2`}>Cédula</th>
              <th className={`py-3 px-1`}>Apellido</th>
              <th className={`py-3 px-1`}>Nombre</th>
              <th className={`py-3 px-1`}>Correo Electrónico</th>
              <th className={`py-3 px-1`}>Ver</th>
              <th className={`py-3 px-1`}>Editar</th>
            </tr>
          </thead>
          <tbody className={`px-10`}>
            {customers?.map((customer, i) => (
              <tr
                key={customer.Cust_id}
                className={`dark:border-slate-600 hover:bg-gray-300 dark:hover:bg-teal-900 py-5 ${
                  i % 2 === 0 && "bg-slate-100 dark:bg-slate-800"
                }`}
              >
                <td className={`py-2 px-2`}>{i + 1}</td>
                <td className={`py-2 px-1`}>{customer.Cust_dni}</td>
                <td className={`py-2 px-1`}>{customer.Cust_surname}</td>
                <td className={`py-2 px-1`}>{customer.Cust_name}</td>
                <td className={`py-2 px-1`}>{customer.Cust_email}</td>
                <td className={`py-2 px-1`}>
                  {/* //*Watch button */}
                  <button
                    className={`bg-gradient-to-b from-rose-500 to-rose-700 hover:from-red-800 hover:to-red-800 transition-colors duration-300 ease-linear rounded-full w-8 h-6 p-1 flex justify-center items-center shadow`}
                    onClick={() => handleView(customer.Cust_id)}
                  >
                    <SearchIcon className={`text-white w-5`} />
                  </button>
                </td>
                <td className={`py-2 px-1`}>
                  {/* //*Edit button */}
                  <button
                    className={`bg-gradient-to-b from-indigo-500 to-indigo-700 hover:from-blue-800 hover:to-blue-800 transition-colors duration-300 ease-linear w-8 h-6 p-1 flex justify-center items-center shadow-md rounded`}
                    onClick={() => handleEdit(customer)}
                  >
                    <FilePenLineIcon className={`text-white w-5`} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
