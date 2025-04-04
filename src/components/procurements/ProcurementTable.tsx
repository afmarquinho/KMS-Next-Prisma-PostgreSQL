"use client";

import { useProcurement } from "@/hooks/useProcurement";

import { formatISOToDate, formatToCurrency } from "@/utils";
import { toast } from "react-toastify";
import { FilePenLineIcon, SearchIcon } from "lucide-react";
import { itemStore, procurementStore } from "@/store";
import { ProcurementType } from "@/interface";
import { GetProcurementButton } from "./GetProcurementButton";

//TODO: Poner la lógica en todas las tablas principales de cada módulo, que si el,array que viene la bd es vacía coloque la leyenda que no hay datos para mostrar

export const ProcurementTable = () => {
  const {
    procurements,
    toggleCurrentView,
    setProcurement,
    setDetailManager,
    setLoadingdetails,
    setProcurementDetails,
  } = procurementStore();
  const { setItems } = itemStore();
  const { getProcurementDetails } = useProcurement();

  // const {get}= usePurchases()

  const handleEdit = async (procurement: ProcurementType) => {
    setProcurement(procurement);
    toggleCurrentView("form");
  };

  const handleView = async (id: number) => {
    setDetailManager(true);
    setLoadingdetails(true);

    try {
      const { ok, data, message } = await getProcurementDetails(id);
      if (ok && data) {
        const { Item, ...procurement } = data;
        setProcurementDetails(procurement);
        setItems(Item);
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

  if (!procurements || procurements.length === 0) {
    const message = !procurements
      ? 'No hay compras para visualizar, presiona el botón "Mostrar Compras".'
      : "No hay compras registrados.";
    return (
      <>
        <GetProcurementButton />
        <div className="italic font-medium text-base">{message}</div>
      </>
    );
  }
  return (
    <>
      <GetProcurementButton />
      <div className="overflow-auto my-5 bg-white p-5 dark:bg-slate-900 rounded">
        <table
          className={`w-full rounded border-collapse text-left overflow-hidden shadow-md`}
        >
          <thead className="bg-indigo-900 text-slate-200 border-b-8 border-b-blue-600">
            <tr>
              <th className="py-3 px-1">Item</th>
              <th className="py-3 px-1 w-96">Descripción</th>
              <th className="py-3 px-1">Proveedor</th>
              <th className="py-3 px-1">Fecha de Compra</th>
              <th className="py-3 px-1">Fecha de Vencimiento</th>
              <th className="py-3 px-1">Forma de pago</th>
              <th className="py-3 px-1">Monto</th>
              <th className="py-3 px-1">Ver</th>
              <th className="py-3 px-1">Editar</th>
            </tr>
          </thead>
          <tbody>
            {procurements.map((procurement, i) => (
              <tr
                key={procurement.Proc_id}
                className={`hover:bg-gray-300 dark:hover:bg-yellow-900 py-5 ${
                  i % 2 === 0 ? "bg-slate-100 dark:bg-slate-800" : ""
                }`}
              >
                <td className="py-2 px-2">{i + 1}</td>
                <td className="py-2 ps-1 pe-5">{procurement.Proc_desc}</td>
                <td className="py-2 px-1">{procurement.Supplier.Supp_name}</td>
                <td className="py-2 px-1">
                  {formatISOToDate(procurement.Proc_date)}
                </td>
                <td className="py-2 px-1">
                  {formatISOToDate(procurement.Proc_dueDate)}
                </td>
                <td className="py-2 px-1">{procurement.Proc_paymentMethod}</td>
                <td className="py-2 px-1">
                  {formatToCurrency(procurement.Proc_totalAmount)}
                </td>

                <td className="py-2 px-1">
                  <button
                    className="w-8 h-6 p-1 bg-rose-500 hover:bg-red-700 text-white rounded shadow-md transition-colors duration-300 ease-linear  flex justify-center items-center"
                    onClick={() => handleView(procurement.Proc_id)}
                  >
                    <SearchIcon className="text-white w-5" />
                  </button>
                </td>
                <td className="py-2 px-1">
                  <button
                    className={`w-8 h-6 p-1 bg-blue-500 hover:bg-blue-700 text-white rounded  shadow-md transition-colors duration-300 ease-linear  flex justify-center items-center ${
                      procurement.Proc_processed && "opacity-40 cursor-not-allowed"
                    }`}
                    disabled={procurement.Proc_processed}
                    onClick={() => handleEdit(procurement)}
                  >
                    <FilePenLineIcon className="text-white w-5" />
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
