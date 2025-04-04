"use client";

import { LoadingSpinner, MainButton } from "@/components/UI";
import { useInventory } from "@/hooks";
import { inventoryStore } from "@/store";
import { PencilLineIcon, RefreshCwIcon, ShoppingCartIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Subtitle } from "../../UI/Subtitle";
import Link from "next/link";

export const ProcurementContent = () => {
  const { processedProcurement: procurements, setProcessedProcurements } =
    inventoryStore();
  const [loading, setLoading] = useState<boolean>(false);
  const { getProcessedProcurements } = useInventory();

  const getProcessed = async () => {
    setLoading(true);
    try {
      const { ok, data, message } = await getProcessedProcurements();
      if (ok && data) {
        setProcessedProcurements(data);
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
    <>
      <MainButton
        variant="tertiary"
        onClick={getProcessed}
        className={`hover:bg-teal-900 dark:hover:bg-slate-900 hover:text-slate-200`}
       
        disabled={loading}
      >
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {procurements ? (
              <RefreshCwIcon className={`w-5`} size={20} strokeWidth={1.25} />
            ) : (
              <ShoppingCartIcon
                className={`w-5`}
                size={20}
                strokeWidth={1.25}
              />
            )}
            {procurements ? "Refrescar" : "Ver Compras"}
          </>
        )}
      </MainButton>
      {!procurements ? (
        <div className={`italic font-medium text-center text-slate-700`}>
          No hay compras pendientes en el panel
        </div>
      ) : procurements.length < 1 ? (
        <div className={`italic font-medium text-base`}>
          No hay compras procesadas aún, comuníquese con el área de compras.
        </div>
      ) : (
        <>
          <Subtitle label="Compras pendientes por procesar" />

          <div className="overflow-auto my-5 bg-white p-5 dark:bg-slate-900 rounded">
            <table className="w-full rounded text-left shadow-md border-collapse overflow-hidden">
              <thead className="bg-indigo-900 text-slate-200 border-b-8 border-b-blue-600">
                <tr>
                  <th className="py-3 px-1">Item</th>
                  <th className="py-3 px-1">Id</th>
                  <th className="py-3 px-1 w-96">Descripción</th>
                  <th className="py-3 px-1">Proveedor</th>
                  <th className="py-3 px-1">Fecha de Compra</th>
                  <th className="py-3 px-1">Fecha de Vencimiento</th>
                  <th className="py-3 px-1">Monto</th>
                  <th className="py-3 px-1">Gestionar</th>
                </tr>
              </thead>
              <tbody>
                {procurements?.map((procurement, i) => (
                  <tr
                    key={procurement.Proc_id}
                    className={`hover:bg-gray-300 dark:hover:bg-teal-900 py-5 ${
                      i % 2 === 0 ? "bg-slate-100 dark:bg-slate-800" : ""
                    }`}
                  >
                    <td className="py-2 px-2">{i + 1}</td>
                    <td className="py-2 px-2 text-left">
                      {procurement.Proc_id}
                    </td>
                    <td className="py-2 ps-1 pe-5">{procurement.Proc_desc}</td>
                    <td className="py-2 px-1">
                      {procurement.Supplier.Supp_name}
                    </td>
                    <td className="py-2 px-1">{procurement.Proc_date}</td>
                    <td className="py-2 px-1">{procurement.Proc_dueDate}</td>
                    <td className="py-2 px-1">
                      {procurement.Proc_totalAmount}
                    </td>
                    <td className="py-2 px-1">
                      <Link
                        href={`/inventory-manager/procurement/${procurement.Proc_id}`}
                        className="w-8 h-6 p-1 bg-rose-500 hover:bg-red-700 text-white rounded shadow-md transition-colors duration-300 ease-linear  flex justify-center items-center"
                      >
                        <PencilLineIcon className="text-white w-5 h-5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};
